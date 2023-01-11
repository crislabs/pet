import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { useSelection } from '@/src/providers/SelectionContext';
import { getQuery } from '@/src/utils';
import { Product } from '@/src/interfaces/product';


interface Props {
  adoption?: Product;
}
export function CardAdoption({ adoption }: Props) {
  const { selected, toggle, isSelected } = useSelection();

  const query = getQuery()
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(adoption?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(adoption?._id!)}
        checked={isSelected(adoption?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            adoption?.dataProduct.seoProduct?.image?.src! ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            adoption?.dataProduct.seoProduct?.image?.alt! || 'image description'
          }
        />
        <Link
          href={`/dashboard/adoptions/${adoption?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {adoption?.dataProduct.seoProduct.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}