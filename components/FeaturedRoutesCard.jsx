function FeaturedRoutesCard({ value }) {
  const { from, to, price, image } = value;
  return (
    <div className='p-lg group relative flex min-h-70 flex-col justify-end overflow-hidden rounded-2xl'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105'
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />
      <div className='relative z-10'>
        <h3 className='text-headline-lg-mobile text-on-primary mb-1'>
          {from} &harr; {to}
        </h3>
        <div className='gap-md text-on-primary/80 flex items-center'>
          <span className='text-label-md gap-xs flex items-center'>
            <span className='material-symbols-outlined text-[18px]'>
              schedule
            </span>
            18 hrs
          </span>
          <span className='text-label-md'>Rs. 8,500</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedRoutesCard;
