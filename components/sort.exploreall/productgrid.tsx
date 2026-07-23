const ProductGridSkeleton = ({count = 8}: {count?:number}) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({length: count}, (_,i) => i+ 1).map((val)=>(
                <div key={val} className="animate-pulse rounded-sm overflow-hidden">
                    <div className="w-full h-56 bg-gray-200 rounded-sm"/>
                    <div className="p-3 flex flex-col gap-2">
                        <div className=" h-4 w-3/4 bg-gray-200 rounded "/>
                        <div className="h-3 w-full bg-gray-200 rounded"/>
                    </div>
                </div>
            ))}
        </div>

    )
}
export default ProductGridSkeleton;