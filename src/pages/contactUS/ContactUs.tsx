import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { GrSchedules } from "react-icons/gr";
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="px-3 md:px-14 my-12">
      <h1 className="text-xl md:text-2xl font-bold pb-3">Contact Info</h1>
      <p>
        We're here to help! Whether you have a question about your order, our
        products, our return policy, or anything else, our dedicated customer
        support team is ready to provide you with the assistance you need. We
        strive to ensure your shopping experience is seamless and enjoyable, and
        we’re always here to address any concerns or feedback you may have. Your
        satisfaction is our top priority.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 my-12">
        <div className="flex flex-col items-center">
          <CiLocationOn className="text-blue-400 text-4xl font-bold pb-2"></CiLocationOn>
          <h1 className="font-bold">Address</h1>
          <p className="text-gray-500">Purana Paltan, Dhaka-1000</p>
        </div>
        <div className="flex flex-col items-center">
          <IoIosPhonePortrait className="text-blue-400 text-4xl font-bold pb-2"></IoIosPhonePortrait>
          <h1 className="font-bold">Phone</h1>
          <p className="text-gray-500">+880-1839033505</p>
        </div>
        <div className="flex flex-col items-center">
          <MdEmail className="text-blue-400 text-4xl font-bold pb-2"></MdEmail>
          <h1 className="font-bold">E-mail Address</h1>
          <p className="text-gray-500">infinte@gmail.com</p>
        </div>
        <div className="flex flex-col items-center">
          <GrSchedules className="text-blue-400 text-4xl font-bold pb-2"></GrSchedules>
          <h1 className="font-bold">Working Days/Hours</h1>
          <p className="text-gray-500">7days / 24 Hours</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-xl font-bold pb-3">Send Us A Message</h1>
          <form>
            <label htmlFor="">
              Your Name
              <span className="text-red-500">*</span>
            </label>
            <input type="text" className="border w-full p-2" />
            <label htmlFor="">
              Your Email
              <span className="text-red-500">*</span>
            </label>
            <input type="text" className="border w-full p-2 my-4" />
            <label className="block" htmlFor="">
              Your Message
              <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              className="border w-full"
              name=""
              id="message"
            ></textarea>
            <button className="block bg-black text-white p-3" type="submit">
              SEND MESSAGE
            </button>
          </form>
        </div>
        <div>
          <h1 className="text-xl font-bold pb-3">Frequently Asked Questions</h1>
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                How do I contact customer support?
              </div>
              <div className="collapse-content">
                <p>
                  You can contact our customer support via email, phone, or live
                  chat on our website. Our support team is available 24/7 to
                  assist you.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                How can I track my order?
              </div>
              <div className="collapse-content">
                <p>
                  You can track your order by logging into your account and
                  navigating to the "Order History" section, where you'll find
                  tracking details for each purchase.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                What payment methods do you accept?
              </div>
              <div className="collapse-content">
                <p>
                  We accept major credit cards, debit cards, PayPal, and other
                  popular payment gateways such as Apple Pay and Google Pay.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                What is your return policy?
              </div>
              <div className="collapse-content">
                <p>
                  Our return policy allows returns within 30 days of purchase.
                  Items must be unused, in their original packaging, and
                  accompanied by the receipt or proof of purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
