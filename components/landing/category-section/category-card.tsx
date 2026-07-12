import { TCategory } from '@/types/category.types';
import Image from 'next/image';

interface IProps {
    category: TCategory
}

const CategoryCard = ({ category }: IProps) => {
    return (
        <div className='h-20 border border-indigo-100 p-1 rounded-md flex gap-2 '>
            {/* image */}
            <div className='h-full aspect-square  rounded-sm'>
                <Image
                    src={category.image.path}
                    alt={category.name}
                    height={200}
                    width={200}
                    className='h-full w-full rounded-sm object-cover'
                />
            </div>
            {/* name & desc */}
            <div className='flex flex-col justify-center'>
                <p className='text-lg font-semibold text-gray-600'>{category.name}</p>
                <p className='line-clamp-2 leading-4.5 text-sm text-gray-400'>{category.description}</p>
            </div>

        </div>
    )
}

export default CategoryCard