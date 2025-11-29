import svgPaths from "./svg-ug38dkddaa";
import imgAdobeExpressFile1 from "figma:asset/35630126fd73575e9d99ca2fb466868d8a791865.png";
import imgSlbktv1 from "figma:asset/9f3ebf499479b4901b5daf35b253054f9f2fb33a.png";
import imgRectangle6 from "figma:asset/98b2adbec7aba8e4e07cf1cdb36e5c83cb954b2c.png";
import imgRectangle7 from "figma:asset/52bd0c7c93a80e3a40b930365853fbaccd9f6098.png";
import imgRectangle8 from "figma:asset/64ca29f3e5132455c2c698346414c2400d42b11c.png";
import imgRectangle9 from "figma:asset/393d179158481b6410b3639228cc2c320da20509.png";

function Bell() {
  return (
    <div className="absolute left-[1118px] size-[48px] top-[28px]" data-name="Bell">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Bell">
          <path d={svgPaths.p38888900} id="Icon" stroke="var(--stroke-0, #F3F3F3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function MessageCircle() {
  return (
    <div className="absolute left-[1199px] size-[48px] top-[24px]" data-name="Message circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Message circle">
          <path d={svgPaths.p329cd680} id="Icon" stroke="var(--stroke-0, #EBFFEE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function User() {
  return (
    <div className="absolute left-[1278px] size-[48px] top-[28px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="User">
          <path d={svgPaths.p205c98f0} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[1278px] top-[28px]">
      <User />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[1272px] top-[22px]">
      <div className="absolute left-[1272px] size-[60px] top-[22px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
          <circle cx="30" cy="30" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1" r="30" />
        </svg>
      </div>
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[1272px] top-[22px]">
      <Group1 />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="absolute left-[1332px] size-[48px] top-[28px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Chevron down">
          <path d="M12 18L24 30L36 18" id="Icon" stroke="var(--stroke-0, #EBFFEE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[1142px] top-[7px]">
      <div className="absolute left-[1142px] size-[25px] top-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
          <circle cx="12.5" cy="12.5" fill="var(--fill-0, white)" id="Ellipse 2" r="12.5" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[47px] justify-center leading-[0] left-[1148px] not-italic text-[#e73322] text-[20px] top-[30.5px] translate-y-[-50%] w-[19px]">
        <p className="leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents left-[1228px] top-[7px]">
      <div className="absolute left-[1228px] size-[25px] top-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
          <circle cx="12.5" cy="12.5" fill="var(--fill-0, white)" id="Ellipse 2" r="12.5" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[47px] justify-center leading-[0] left-[1234px] not-italic text-[#e73322] text-[20px] top-[30.5px] translate-y-[-50%] w-[19px]">
        <p className="leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[rgba(26,149,220,0.97)] h-[104px] left-0 overflow-clip top-0 w-[1440px]">
      <div className="absolute h-[102px] left-[45px] top-px w-[93px]" data-name="Adobe Express - file 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAdobeExpressFile1} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[101px] justify-center leading-[0] left-[269.5px] not-italic text-[25px] text-center text-white top-[53.5px] translate-x-[-50%] translate-y-[-50%] w-[159px]">
        <p className="leading-[normal]">Trang chủ</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[104px] justify-center leading-[0] left-[466.5px] not-italic text-[25px] text-center text-white top-[52px] translate-x-[-50%] translate-y-[-50%] w-[191px]">
        <p className="leading-[normal]">Tìm giảng viên</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[104px] justify-center leading-[0] left-[697.5px] not-italic text-[25px] text-center text-white top-[52px] translate-x-[-50%] translate-y-[-50%] w-[219px]">
        <p className="leading-[normal]">Lịch học của tôi</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[104px] justify-center leading-[0] left-[880.5px] not-italic text-[25px] text-center text-white top-[52px] translate-x-[-50%] translate-y-[-50%] w-[161px]">
        <p className="leading-[normal]">Tài liệu</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[104px] justify-center leading-[0] left-[1024px] not-italic text-[25px] text-center text-white top-[52px] translate-x-[-50%] translate-y-[-50%] w-[156px]">
        <p className="leading-[normal]">Hồ sơ</p>
      </div>
      <Bell />
      <MessageCircle />
      <Group2 />
      <ChevronDown />
      <Group12 />
      <Group13 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[111px] top-[206px]">
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[75px] justify-center leading-[0] left-[111px] not-italic text-[#faf6f6] text-[25px] top-[243.5px] translate-y-[-50%] w-[356px]">
        <p className="leading-[normal]">{`Xin chào, Nguyễn Văn A! `}</p>
      </div>
    </div>
  );
}

function MapPin() {
  return (
    <div className="absolute left-[101px] size-[20px] top-[396px]" data-name="Map pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_263)" id="Map pin">
          <g id="Icon">
            <path d={svgPaths.p3a892e00} stroke="var(--stroke-0, #F3F3F3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            <path d={svgPaths.p1b144480} stroke="var(--stroke-0, #F3F3F3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_263">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Book() {
  return (
    <div className="absolute left-[100px] size-[22px] top-[335px]" data-name="Book">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_1_271)" id="Book">
          <path d={svgPaths.p2bad9500} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_271">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BookOpen() {
  return (
    <div className="absolute left-[101px] size-[22px] top-[366px]" data-name="Book open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_1_260)" id="Book open">
          <path d={svgPaths.p8626080} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_260">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#686262] h-[832px] left-0 overflow-clip top-0 w-[1440px]">
      <div className="absolute h-[729px] left-[-177px] top-[103px] w-[1794px]" data-name="slbktv 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSlbktv1} />
      </div>
      <Frame1 />
      <div className="absolute h-[266px] left-[60px] top-[192px] w-[528px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 528 266">
          <path d={svgPaths.p12241900} fill="var(--fill-0, #060929)" fillOpacity="0.8" id="Rectangle 1" />
        </svg>
      </div>
      <Group3 />
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[190px] justify-center leading-[normal] left-[104px] not-italic text-[25px] text-white top-[361px] translate-y-[-50%] w-[497px]">
        <p className="mb-0">{`Buổi học sắp tới: 24/10/2025 - 09:00 `}</p>
        <p className="whitespace-pre-wrap">
          {`      Môn học:  Cấu trúc dữ liệu`}
          <br aria-hidden="true" />
          {`       Giảng viên: Lê Văn B`}
          <br aria-hidden="true" />
          {`        Địa điểm: GDH6`}
        </p>
      </div>
      <MapPin />
      <Book />
      <BookOpen />
    </div>
  );
}

function Frame2() {
  return <div className="absolute h-[8px] left-0 top-[1385.83px] w-[1440px]" />;
}

function Frame4() {
  return (
    <div className="absolute bg-[#200909] h-[125px] left-0 overflow-clip top-[1226px] w-[1440px]">
      <div className="absolute bg-[#9e9b9b] h-[145px] left-0 top-0 w-[1440px]" />
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[125px] justify-center leading-[0] left-[20px] not-italic text-[#1e1e1e] text-[22px] top-[62.5px] translate-y-[-50%] w-[1213px]">
        <p className="leading-[normal]">
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">Email contact:</span>
          <span>
            {` bankt@hcmut.edu.vn`}
            <br aria-hidden="true" />
          </span>
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">Số điện thoại:</span>
          <span>
            {` 0905xxxxxx`}
            <br aria-hidden="true" />
            {`Quý `}
          </span>
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">Thầy/Cô</span>
          <span>{` chưa có tài khoản (hoặc quên mật khẩu) nhà trường vui lòng liên hệ Trung tâm Dữ liệu & Công nghệ Thông tin, phòng 109 nhà A5 để được hỗ trợ. `}</span>
        </p>
      </div>
    </div>
  );
}

function TrangCh() {
  return (
    <div className="absolute bg-white h-[1351px] left-0 overflow-clip top-0 w-[1440px]" data-name="Trang chủ">
      <Frame />
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[157px] top-[51px]">
      <div className="absolute bg-[#faf6f6] h-[250px] left-[157px] rounded-[10px] top-[51px] w-[220px]" data-name="Rounded rectangle" />
      <div className="absolute h-[90px] left-[157px] rounded-[10px] top-[51px] w-[220px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle6} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[27px] justify-center leading-[0] left-[165px] not-italic text-[22px] text-black top-[162.5px] translate-y-[-50%] w-[105px]">
        <p className="leading-[normal]">Giải tích 1</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[37.5px] justify-center leading-[0] left-[165px] not-italic text-[22px] text-black top-[190.75px] translate-y-[-50%] w-[205px]">
        <p className="leading-[normal]">GV: Lê Văn B</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[39.773px] justify-center leading-[0] left-[165px] not-italic text-[22px] text-black top-[218.89px] translate-y-[-50%] w-[190px]">
        <p className="leading-[normal]">{`Đánh giá: ⭐4.8 `}</p>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[767px] top-[47px]">
      <div className="absolute bg-[#f3f3f3] h-[250px] left-[767px] rounded-[10px] top-[47px] w-[220px]" data-name="Rounded rectangle" />
      <div className="absolute h-[90px] left-[767px] rounded-[10px] top-[47px] w-[220px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle7} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[41px] justify-center leading-[0] left-[775px] not-italic text-[22px] text-black top-[165.5px] translate-y-[-50%] w-[212px]">
        <p className="leading-[normal]">Cấu trúc DL và GT (DSA)</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[775px] not-italic text-[22px] text-black top-[203.5px] translate-y-[-50%] w-[205px]">
        <p className="leading-[normal]">GV: Hồ Ngọc H</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[39.773px] justify-center leading-[0] left-[775px] not-italic text-[22px] text-black top-[231.89px] translate-y-[-50%] w-[190px]">
        <p className="leading-[normal]">{`Đánh giá: ⭐4.9 `}</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Semi_Bold_Italic',sans-serif] font-semibold h-[22px] italic justify-center leading-[0] left-[870px] text-[#e73322] text-[22px] text-center top-[265px] translate-x-[-50%] translate-y-[-50%] w-[164px]">
        <p className="leading-[normal]">Đăng ký ngay</p>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[767px] top-[47px]">
      <Group6 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[462px] top-[51px]">
      <div className="absolute bg-[#faf6f6] h-[250px] left-[462px] rounded-[10px] top-[51px] w-[220px]" data-name="Rounded rectangle" />
      <div className="absolute h-[90px] left-[462px] rounded-[10px] top-[51px] w-[220px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle8} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[27px] justify-center leading-[0] left-[470px] not-italic text-[22px] text-black top-[162.5px] translate-y-[-50%] w-[105px]">
        <p className="leading-[normal]">Vật lý 1</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[38px] justify-center leading-[0] left-[470px] not-italic text-[22px] text-black top-[191px] translate-y-[-50%] w-[212px]">
        <p className="leading-[normal] whitespace-pre-wrap">{`GV:  Vũ Xuân D`}</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[39.773px] justify-center leading-[0] left-[470px] not-italic text-[22px] text-black top-[218.89px] translate-y-[-50%] w-[190px]">
        <p className="leading-[normal]">{`Đánh giá: ⭐4.5 `}</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Semi_Bold_Italic',sans-serif] font-semibold h-[22px] italic justify-center leading-[0] left-[568px] text-[#e73322] text-[22px] text-center top-[262px] translate-x-[-50%] translate-y-[-50%] w-[164px]">
        <p className="leading-[normal]">Đăng ký ngay</p>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[462px] top-[51px]">
      <Group5 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[1072px] top-[47px]">
      <div className="absolute bg-[#f3f3f3] h-[250px] left-[1072px] rounded-[10px] top-[47px] w-[220px]" data-name="Rounded rectangle" />
      <div className="absolute h-[90px] left-[1072px] rounded-[10px] top-[47px] w-[220px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle9} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[27px] justify-center leading-[0] left-[1080px] not-italic text-[22px] text-black top-[158.5px] translate-y-[-50%] w-[151px]">
        <p className="leading-[normal]">Hệ thống số</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[37.5px] justify-center leading-[0] left-[1080px] not-italic text-[22px] text-black top-[186.75px] translate-y-[-50%] w-[205px]">
        <p className="leading-[normal]">GV: Lâm Văn T</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[39.773px] justify-center leading-[0] left-[1080px] not-italic text-[22px] text-black top-[214.89px] translate-y-[-50%] w-[190px]">
        <p className="leading-[normal]">{`Đánh giá: ⭐4.6 `}</p>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[1072px] top-[47px]">
      <Group7 />
      <div className="absolute flex flex-col font-['Inter:Semi_Bold_Italic',sans-serif] font-semibold h-[22px] italic justify-center leading-[0] left-[1183px] text-[#e73322] text-[22px] text-center top-[265px] translate-x-[-50%] translate-y-[-50%] w-[164px]">
        <p className="leading-[normal]">Đăng ký ngay</p>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[650px] top-[312px]">
      <div className="absolute bg-[#f3f3f3] h-[56px] left-[650px] rounded-[20px] top-[312px] w-[146px]" data-name="Rounded rectangle">
        <div aria-hidden="true" className="absolute border border-[#983030] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[46px] justify-center leading-[0] left-[657px] not-italic text-[#ff0f0f] text-[22px] top-[340px] translate-y-[-50%] w-[139px]">
        <p className="leading-[normal]">Show more...</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[rgba(97,21,21,0.12)] h-[393px] left-0 overflow-clip top-[832px] w-[1440px]">
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[35px] justify-center leading-[0] left-[68px] not-italic text-[25px] text-black top-[22.5px] translate-y-[-50%] w-[835px]">
        <p className="leading-[normal]">Một số gợi ý về giảng viên và môn học:</p>
      </div>
      <Group4 />
      <Group9 />
      <Group8 />
      <Group10 />
      <div className="absolute flex flex-col font-['Inter:Semi_Bold_Italic',sans-serif] font-semibold h-[22px] italic justify-center leading-[0] left-[267px] text-[#e73322] text-[22px] text-center top-[259px] translate-x-[-50%] translate-y-[-50%] w-[164px]">
        <p className="leading-[normal]">Đăng ký ngay</p>
      </div>
      <Group11 />
    </div>
  );
}

function FrontHand() {
  return (
    <div className="absolute left-[67px] size-[32px] top-[229px]" data-name="front_hand">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="front_hand">
          <path d={svgPaths.p26105f80} fill="var(--fill-0, #FEF7FF)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Calendar() {
  return (
    <div className="absolute left-[67px] size-[32px] top-[299px]" data-name="Calendar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Calendar">
          <path d={svgPaths.p26415800} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-0 top-0">
      <TrangCh />
      <Frame3 />
      <FrontHand />
      <Calendar />
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="relative size-full">
      <Group14 />
    </div>
  );
}