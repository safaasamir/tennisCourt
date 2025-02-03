// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { dataCourt } from "../courtData";
// import styles from "../Css/Court.module.css"
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`  ${className}`}
//       style={{ ...style, display: "block"}}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`  ${className}`}
//       style={{ ...style, display: "block"}}
//       onClick={onClick}
//     />
//   );
// }
// function SliderCourt() {
//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     initialSlide: 0,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

// return (
//     <div className={` container mx-auto ${styles.App}`} >
//       <Slider {...settings}>
//         {dataCourt.map((item) => (
//           <div
//             key={item.id}
//             className={`shadow-md ${styles.card}`}
//           >
//             <div className={styles.cardtop}>
//               <div className="relative w-[500px] h-[300px]">
//                 <img
//                   src={item.linkimage}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-all duration-300"
//                 />
//                 <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-start justify-center">
//                   <div className="flex flex-col items-start p-4 w-full text-white">
//                     <h1 className="text-xl font-bold mb-2">{item.title}</h1>
//                     <p className="text-lg mb-2">
//                       <span className="font-bold">Court Price: </span>
//                       {item.price} <span className="font-bold">EGP</span>
//                     </p>
//                     <p className="text-lg mb-4">
//                       <span className="font-bold">Court Type: </span>
//                       {item.category}
//                     </p>
//                     <div className="flex space-x-4">
//                       <button className="shadow-xl hover:opacity-70 p-2 rounded-md bg-mainColor text-black transition-colors">
//                         More Details
//                       </button>
//                       <button className="shadow-xl hover:opacity-70 p-2 rounded-md border  border-mainColor text-white hover:bg-mainColor hover:text-mainTextColor transition-colors">
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
  
// }

// export default SliderCourt;
// import React from "react";
// import { dataCourt } from "../courtData";
// import styles from "../Css/Court.module.css";

// function SliderCourt() {
//   return (
//     <div className={`container mx-auto ${styles.App}`}>
//       <div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//       >
//         {dataCourt.map((item) => (
//           <div
//             key={item.id}
//             className={`shadow-md ${styles.card}`}
//           >
//             <div className={styles.cardtop}>
//               <div className="relative w-full h-[300px]">
//                 <img
//                   src={item.linkimage}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-all duration-300"
//                 />
//                 <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-start justify-center">
//                   <div className="flex flex-col items-start p-4 w-full text-white">
//                     <h1 className="text-xl font-bold mb-2">{item.title}</h1>
//                     <p className="text-lg mb-2">
//                       <span className="font-bold">Court Price: </span>
//                       {item.price} <span className="font-bold">EGP</span>
//                     </p>
//                     <p className="text-lg mb-4">
//                       <span className="font-bold">Court Type: </span>
//                       {item.category}
//                     </p>
//                     <div className="flex space-x-4">
//                       <button className="shadow-xl hover:opacity-70 p-2 rounded-md bg-mainColor text-black transition-colors">
//                         More Details
//                       </button>
//                       <button className="shadow-xl hover:opacity-70 p-2 rounded-md border border-mainColor text-white hover:bg-mainColor hover:text-mainTextColor transition-colors">
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SliderCourt;

// import React from "react";
// import { dataCourt } from "../courtData";
// import styles from "../Css/Court.module.css";

// function SliderCourt() {
//   return (
//     <div className={`container mx-auto  ${styles.App}`}>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 pb-20 relative">
//         {dataCourt.map((item,index) => (
//           <div
//             key={item.id}
//             className={`shadow-2xl rounded-lg overflow-hidden bg-white relative ${
//               index < 3
//                 ? " col-span-2 " // الصف الأول: 3 كروت
//                 : "col-span-3 " // الصف الثاني والثالث: 2 كارت جنب بعض
//             }`}
//           >
//             <div className="relative w-full h-[300px]">
//               <img
//                 src={item.linkimage}
//                 alt={item.title}
//                 className="w-full h-full object-cover transition-all duration-300"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-start justify-center">
//                 <div className="flex flex-col items-start p-4 w-full text-white">
//                   <h1 className="text-xl font-bold mb-2">{item.title}</h1>
//                   <p className="text-lg mb-2">
//                     <span className="font-bold">Court Price: </span>
//                     {item.price} <span className="font-bold">EGP</span>
//                   </p>
//                   <p className="text-lg mb-4">
//                     <span className="font-bold">Court Type: </span>
//                     {item.category}
//                   </p>
//                   <div className="flex space-x-4">
//                     <button className="shadow-lg hover:opacity-70 p-2 rounded-md bg-mainColor text-black transition-colors">
//                       More Details
//                     </button>
//                     <button className="shadow-lg hover:opacity-70 p-2 rounded-md border border-mainColor text-white hover:bg-mainColor hover:text-mainTextColor transition-colors">
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SliderCourt;
