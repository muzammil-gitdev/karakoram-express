function FeaturedRoutesCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[280px] flex flex-col justify-end p-lg group">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApO1M0nnZtLvu28d2kuBd-xLI8-Kf89gmwxMlZKmJ0X8Hs4UhNz0fxhuxMtotBZvt00zHMIyisfM0ozUNeh1QuKf4MlA7eCJGFDKEZvlPfnHrRjl4Sh-Vx3qilTl7JTsus2mQJ2uJCMn-_4AjP3L_wEu-I2k9nawJj0UU7o8uPeLsbceng3UnxhM6OF5K0n0hB3RfCe2Rbm9akk5m6Qb6uUGFfQWSxQhLKm_8g6CvB382nudb4kHaKvKTtA_MgmD0UgRJ5-NkiNY9A')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10">
        <h3 className="text-headline-lg-mobile text-on-primary mb-1">
          Rawalpindi &harr; Gahkuch
        </h3>
        <div className="flex items-center gap-md text-on-primary/80">
          <span className="text-label-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">
              schedule
            </span>
            18 hrs
          </span>
          <span className="text-label-md">Rs. 8,500</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedRoutesCard;
