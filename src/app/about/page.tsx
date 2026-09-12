import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[#f8f9fc] min-h-[80vh] flex justify-center py-12  px-6">
      <div className="max-w-[1000px] w-full bg-white rounded-2xl shadow-sm p-8 md:p-16 flex flex-col lg:flex-row  gap-12">

        {/* Text Content */}
        <div className="flex-1 text-[#333]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-black">About Us</h1>

          <div className="space-y-6 text-[15px] md:text-[16px] leading-relaxed">
            <p>
              Welcome to our store. We are focused on delivering quality products, transparent pricing, and a smooth shopping experience.
            </p>

            <p>
              Our team works every day to keep product quality high, deliveries reliable, and customer support responsive.
            </p>

            <h3 className="font-bold text-black text-[17px] md:text-[18px] mt-10 mb-4">What we stand for</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1">•</span>
                <span>Quality products from trusted suppliers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1">•</span>
                <span>Fair pricing and clear communication.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1">•</span>
                <span>Fast support for order and delivery issues.</span>
              </li>
            </ul>

            <p className="pt-8">
              Thank you for shopping with us.
            </p>
          </div>
        </div>

        {/* The One Image */}
        <div className="w-full lg:w-[400px] shrink-0 mt-4 md:mt-0 flex items-center">
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/phone_mockup.png"
              alt="About Our Store"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}