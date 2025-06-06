'use client';

interface Props {
    icon: React.ReactElement,
    title: string
}

const TechStackItem: React.FC<Props> = ({icon, title}) => {
    return (
        <div className='flex flex-col items-center gap-2 m-4'>
            {icon}
            <p className='text-sm'>{title}</p>
        </div>
    )
}

export default TechStackItem;