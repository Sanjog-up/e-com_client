"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";

export default function TryOnPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const rafRef = useRef<number | null>(null);

  const [status, setStatus] = useState<
    "loading" | "ready" | "no-camera" | "error"
  >("loading");

  // ---- 1. Load the MediaPipe FaceLandmarker model once ----
  useEffect(() => {
    let cancelled = false;

    async function setup() {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const faceLandmarker = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );

        if (cancelled) return;
        faceLandmarkerRef.current = faceLandmarker;

        await startWebcam();
      } catch (err) {
        console.error("Failed to load face landmarker:", err);
        if (!cancelled) setStatus("error");
      }
    }

    setup();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      faceLandmarkerRef.current?.close();
      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- 2. Get webcam access ----
  async function startWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        setStatus("ready");
        predictLoop();
      };
    } catch (err) {
      console.error("Webcam access denied or unavailable:", err);
      setStatus("no-camera");
    }
  }

  // ---- 3. Per-frame prediction + landmark drawing ----
  function predictLoop() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const faceLandmarker = faceLandmarkerRef.current;
    if (!video || !canvas || !faceLandmarker) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const tick = () => {
      if (video.readyState >= 2) {
        const result: FaceLandmarkerResult = faceLandmarker.detectForVideo(
          video,
          performance.now()
        );

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (result.faceLandmarks.length > 0) {
          drawLandmarkDots(ctx, result.faceLandmarks[0], canvas.width, canvas.height);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
  }

  // Draws all ~478 landmarks as small dots — this confirms tracking works
  // before we worry about placing glasses on top.
  function drawLandmarkDots(
    ctx: CanvasRenderingContext2D,
    landmarks: { x: number; y: number }[],
    width: number,
    height: number
  ) {
    ctx.fillStyle = "#22d3ee";
    for (const point of landmarks) {
      const x = point.x * width;
      const y = point.y * height;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Highlight the two landmarks we'll use for glasses placement next:
    // 33 = left eye outer corner, 263 = right eye outer corner
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    ctx.fillStyle = "#f97316";
    for (const point of [leftEye, rightEye]) {
      const x = point.x * width;
      const y = point.y * height;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 p-6 text-neutral-100">
      <h1 className="text-xl font-medium">Virtual Try-On — Tracking Test</h1>

      <div className="relative w-[640px] max-w-full overflow-hidden rounded-xl border border-neutral-800">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full -scale-x-100 transform"
        />
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 w-full -scale-x-100 transform"
        />

        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-sm">
            Loading face tracking model…
          </div>
        )}
        {status === "no-camera" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6 text-center text-sm">
            Camera access is blocked or unavailable. Allow camera permission
            and reload the page.
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6 text-center text-sm">
            Something went wrong loading the tracking model. Check the
            console for details.
          </div>
        )}
      </div>

      <p className="max-w-md text-center text-sm text-neutral-400">
        Cyan dots are the ~478 tracked face landmarks. Orange dots mark the
        two eye-corner points we&apos;ll use next to position the glasses.
      </p>
    </div>
  );
}