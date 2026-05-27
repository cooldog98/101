import React, { useEffect, useState, useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";

function Home() {

  const promotions = [
    { id: 1, image: "/promotions/1.jpg", price: "369", name: "ซื้อ 1 แถม 1 ไอศกรีม ควอท ราคาพิเศษ 369 บาท"},
    { id: 2, image: "/promotions/2.jpg", price: "478", name: "[ลด 50%] ซื้อ 4 ไอศกรีม มินิ ควอท ราคาพิเศษ 478 บาท"},
    { id: 3, image: "/promotions/3.jpg", price: "369", name: "ไอศกรีม ควอท ฟรี มินิ ควอท 369 บาท สำหรับลูกค้าทุกท่าน"},
    { id: 4, image: "/promotions/4.jpg", price: "299", name: "[Duo Set สุดคุ้ม] ซื้อ 2 ไอศกรีม มินิ ควอท เพียง 299.-"},
    { id: 5, image: "/promotions/5.jpg", price: "499", name: "[Duo Set สุดคุ้ม] ซื้อ 2 ไอศกรีม ควอท เพียง 499.-"},
    { id: 6, image: "/promotions/6.jpg", price: "499", name: "ไอศกรีมเค้ก ทริปเปิ้ล ช็อกโก 1.5 ปอนด์ ฟรี ไอศกรีมสกู๊ป 499 บาท สำหรับลูกค้าทุก"},
    { id: 7, image: "/promotions/7.jpg", price: "499", name: "ไอศกรีมเค้ก ชาเขียว มัทฉะ ช็อกโก บราวนีส์ 1.5 ปอนด์ ฟรี ไอศกรีมสกู๊ป 499 บาท สำหรับลูกค้าทุกท่าน"},
    { id: 8, image: "/promotions/8.jpg", price: "499", name: "ไอศกรีมเค้ก ดับเบิ้ล ชาไทย 1.5 ปอนด์ ฟรี ไอศกรีมสกู๊ป 499 บาท สำหรับลูกค้าทุกท่าน"},
    { id: 9, image: "/promotions/9.jpg", price: "499", name: "ไอศกรีมเค้ก โซ สตรอว์เบอร์รี 1.5 ปอนด์ ฟรี ไอศกรีมสกู๊ป 499 บาท สำหรับลูกค้าทุกท่าน"},
  ];

  const [select, setSelect] = useState("ไอศกรีมเค้ก");

  const categories = [
    "ฟรุตตี้ ช็อกโก ป๊อบส์",
    "ใหม่ ไอศกรีมทุเรียนหมอนทอง",
    "Mini Quart รสชาติพิเศษ เฉพาะช่วงนี้เท่านั้น!",
    "ไอศกรีมเค้ก",
    "ไอศกรีมควอท (450g)",
    "ไอศกรีมมินิ ควอท (250g)",
    "ไอศกรีมสกู๊ป",
    "ท็อปปิ้ง",
    "เทียน"
  ];

  const products = {
    "ฟรุตตี้ ช็อกโก ป๊อบส์": [
      { id: 1, image: "/fruity/1.jpg", price: "199", name: "ฟรุตตี้ ช็อกโก ป็อบส์" },
    ],
    "ใหม่ ไอศกรีมทุเรียนหมอนทอง": [
      { id: 2, image: "/new/1.jpg", price: "319", name: "<โปรโมชั่น> 2 ทุเรียน หมอนทอง ซันเด เซต พร้อมข้าวเหนียวอัญชันสันป่าตอง เพียง 319.-" },
      { id: 3, image: "/new/2.jpg", price: "469", name: "<โปรโมชั่น> ซื้อ 2 ไอศกรีม ควอท (เฉพาะรสชาติแคมเปญทุเรียน) เพียง 469.-" },
      { id: 4, image: "/new/3.jpg", price: "189", name: "ทุเรียน หมอนทอง ซันเด เซต พร้อมข้าวเหนียวอัญชันสันป่าตอง" },
      { id: 5, image: "/new/4.jpg", price: "189", name: "ทุเรียนหมอนทองโมจิ" },
      { id: 6, image: "/new/5.jpg", price: "599", name: "ไอศกรีมเค้กทุเรียนหมอนทอง M" },
      { id: 7, image: "/new/6.jpg", price: "69", name: "ไอศกรีมสกู๊ป รสชาติใหม่" },
      { id: 8, image: "/new/7.jpg", price: "239", name: "ไอศกรีมมินิ ควอท รสชาติใหม่" },
      { id: 9, image: "/new/8.jpg", price: "369", name: "ไอศกรีมควอท รสชาติใหม่" },
    ],
    "ไอศกรีมเค้ก": [
        { id: 10, image: "/icecremcake/1.jpg", price: "899", name: "ไอศกรีมเค้กทริปเปิ้ล เฟลเวอร์ 3 ปอนด์" },
        { id: 11, image: "/icecremcake/2.jpg", price: "899", name: "ไอศกรีมเค้กช็อกโก 3 ปอนด์" },
        { id: 12, image: "/icecremcake/3.jpg", price: "899", name: "ไอศกรีมเค้กวันเดอร์ฟูล สตรอว์เบอร์รี 3 อนด์" },
    ],
    "ไอศกรีมควอท (450g)": [
        { id: 13, image: "/450g/1.jpg", price: "369", name: "ไอศกรีมควอท" },
    ],
    "ไอศกรีมมินิ ควอท (250g))": [
      { id: 14, image: "/250g/1.jpg", price: "239", name: "ไอศกรีม มินิ ควอท" },
    ],
    "ไอศกรีมสกู๊ป": [
      { id: 15, image: "/scoop/1.jpg", price: "69", name: "ไอศกรีมสกู๊ป" },
    ],
    "ท็อปปิ้ง": [
      { id: 16, image: "/topping/1.jpg", price: "49", name: "แฟนเวเฟอร์ โอเวอร์โหลด" },
      { id: 17, image: "/topping/2.jpg", price: "30", name: "กระฉีกมะพร้าว" },
      { id: 18, image: "/topping/3.jpg", price: "49", name: "อัลมอนด์ โอเวอร์โหลด" },
      { id: 19, image: "/topping/4.jpg", price: "49", name: "เชอร์รี่ โอเวอร์โหลด" },
      { id: 20, image: "/topping/5.jpg", price: "49", name: "ช็อกโกแลตชิพ โอเวอร์โหลด" },
      { id: 21, image: "/topping/6.jpg", price: "49", name: "เรนโบว์ โอเวอร์โหลด" },
      { id: 22, image: "/topping/7.jpg", price: "49", name: "มิกซ์นัท โอเวอร์โหลด" },
      { id: 23, image: "/topping/8.jpg", price: "49", name: "โอรีโอ โอเวอร์โหลด" },
      { id: 24, image: "/topping/9.jpg", price: "49", name: "ช็อกโกแลตฟัดจ์ โอเวอร์โหลด" },
      { id: 25, image: "/topping/10.jpg", price: "60", name: "ข้าวเหนียวใบเตยหอม" },
      { id: 26, image: "/topping/11.jpg", price: "49", name: "แยมสตรอว์เบอร์รี โอเวอร์โหลด" },
      { id: 27, image: "/topping/12.jpg", price: "49", name: "คาราเมล โอเวอร์โหลด" },
      { id: 28, image: "/topping/13.jpg", price: "49", name: "คุ้กกี้ ครัมเบิ้ล โอเวอร์โหลด" },
      { id: 29, image: "/topping/14.jpg", price: "49", name: "ลูกชิด โอเวอร์โหลด" },
      { id: 30, image: "/topping/15.jpg", price: "49", name: "แยมสับปะรด โอเวอร์โหลด" },
      { id: 31, image: "/topping/16.jpg", price: "49", name: "แยมบลูเบอร์รี โอเวอร์โหลด" },
      { id: 32, image: "/topping/17.jpg", price: "49", name: "ช็อกโกแลตบอล โอเวอร์โหลด" },
      { id: 33, image: "/topping/18.jpg", price: "49", name: "คิดส์แฟน โอเวอร์โหลด" },
      { id: 34, image: "/topping/19.jpg", price: "60", name: "บราวนี" },
      { id: 35, image: "/topping/20.jpg", price: "95", name: "ลาวาเค้ก" },
      { id: 36, image: "/topping/21.jpg", price: "60", name: "ข้าวเหนียวใบเตยสันป่าตอง" },
      { id: 37, image: "/topping/22.jpg", price: "60", name: "ข้าวเหนียวอัญชันสันป่าตอง" },
      { id: 38, image: "/topping/23.jpg", price: "75", name: "ข้าวเหนียวอัญชันสันป่าตองหน้ากระฉีกมะพร้าว" },
      { id: 39, image: "/topping/24.jpg", price: "20", name: "ซอสทุเรียน" },
      { id: 40, image: "/topping/25.jpg", price: "20", name: "มะพร้าวอ่อน" },
      { id: 41, image: "/topping/126.jpg", price: "20", name: "ไวท์ครีมซอส" },
    ],
    "เทียน": [
      { id: 42, image: "/canldes/1.jpg", price: "49", name: "เทียนวันเกิดลายพิเศษ - Colorful" },
      { id: 43, image: "/canldes/2.jpg", price: "49", name: "เทียนวันเกิดลายพิเศษ - Pink Metallic" },
      { id: 44, image: "/canldes/3.jpg", price: "49", name: "เทียนวันเกิด" },
    ],
};


  return (
    <div className="ml-4 mr-4 lg:ml-10 mr-10">
      <div className="lg:flex lg:items-center lg:gap-4 mt-[5vh] mx-2">
          <span className="block text-xl font-bold whitespace-nowrap mb-2 lg:mb-0">
              ไปส่งที่:
          </span>
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 cursor-pointer lg:flex-1">
              <div className="flex items-center leading-none gap-2">
                  <IoLocationOutline className="text-gray-500 text-xl"/>
                  <span>เลือกที่อยู่สำหรับจัดส่ง</span>
              </div>
              <AiFillCaretDown className="text-gray-500"/>
          </div>
      </div>

      <span className="text-3xl text-bold ml-2 mt-18">สวัสดี</span>
      <div className="mt-8">
        <img src="/sw-banner.jpg" alt="Banner" className="w-full mt-8 rounded-2xl" />
      </div>

      <div className="flex items-center justify-center mt-4">
        <div className="w-2 h-2 rounded-full bg-red-600" />
      </div>

      <span className="block text-3xl text-bold ml-2 mt-[5vh]">
        โปรโมชัน
      </span>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 mt-4">
        {promotions.map((promo) => (
          <div key={promo.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer">
            <div className="relative">
              <img src={promo.image} alt={promo.name} className="w-full h-48 object-cover" />
                  
              <button className="lg:hidden absolute bottom-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl">
                +
              </button>
            </div>

            <div className="relative p-3">
              <div className="absolute inset-0 bg-white/40 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                  
              <span className="relative z-10 text-red-600 font-bold">฿ {promo.price}</span>
              <p className="relative z-10 text-sm mt-1">{promo.name}</p>
              <button className="relative z-10 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 w-full mt-3 bg-red-600 hover:opacity-80 text-white py-2 rounded-full hidden lg:flex items-center justify-center font-medium">
                ดูรายละเอียด
              </button>
            </div>
          </div>
        ))}
      </div>

      <span className="block text-3xl text-bold ml-2 mt-[5vh]">
        เมนูจัดส่ง
      </span>

      <div className="flex flex-wrap gap-2 px-4 py-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelect(category === select ? "ไอศกรีมเค้ก" : category)}
            className={`px-4 py-2 rounded-xl border trasition-olors duration-200 whitespace-nowrap
                ${select === category ? "border-red-600 text-red-600 bg-red-100" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-6">
        {(products[select] ||[]).map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <button className="lg:hidden absolute bottom-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl">
                  +
              </button>
            </div>

            <div className="p-3 lg:group-hover:bg-white/80 lg:group-hover:backdrop-blur-sm transition-all duration-300">
              <span className="text-red-600 font-bold">฿ {item.price}</span>
              <p className="text-sm mt-1">{item.name}</p>
              <div className="absolute inset-0 bg-white/70 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              <button className="relative z-10 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex w-full mt-3 bg-red-600 text-white py-2 rounded-full items-center justify-center font-medium">                  ดูรายละเอียด
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
  
export default Home;