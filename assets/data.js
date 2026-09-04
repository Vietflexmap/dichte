(() => {
  "use strict";
  const STATUS = {
    new:{label:"Ca mới (0–2 ngày)",short:"Ca mới",color:"#e6504f",icon:"N"},
    active:{label:"Đang theo dõi",short:"Đang theo dõi",color:"#f5a623",icon:"Đ"},
    recovered:{label:"Đã kết thúc theo dõi",short:"Đã kết thúc",color:"#22a89a",icon:"K"},
    suspected:{label:"Ca nghi ngờ",short:"Nghi ngờ",color:"#8b6bb4",icon:"?"}
  };
  const CENTERS = [
    ["TP. Hồ Chí Minh","Khu vực trung tâm",10.7769,106.7009,34,"Trung tâm Giám sát Mô phỏng TP.HCM"],
    ["Bình Dương","Khu vực Thủ Dầu Một",10.9804,106.6519,18,"Cơ sở Tiếp nhận Giả định Bình Dương"],
    ["Đồng Nai","Khu vực Biên Hòa",10.9574,106.8427,20,"Trạm Dịch tễ Mô phỏng Đồng Nai"],
    ["Tây Ninh","Khu vực đô thị",11.3352,106.1099,16,"Điểm Giám sát Giả định Tây Ninh"],
    ["Long An","Khu vực Tân An",10.5359,106.4137,16,"Cơ sở Theo dõi Mô phỏng Long An"],
    ["Tiền Giang","Khu vực Mỹ Tho",10.3600,106.3600,16,"Trung tâm Tiếp nhận Giả định Tiền Giang"],
    ["Bến Tre","Khu vực Bến Tre",10.2434,106.3756,14,"Trạm Giám sát Mô phỏng Bến Tre"],
    ["Vĩnh Long","Khu vực Vĩnh Long",10.2396,105.9572,14,"Trung tâm Theo dõi Giả định Vĩnh Long"],
    ["Cần Thơ","Khu vực Ninh Kiều",10.0452,105.7469,16,"Cơ sở Mô phỏng Cần Thơ"],
    ["Cà Mau","Khu vực Cà Mau",9.1769,105.1524,14,"Trạm Dịch tễ Giả định Cà Mau"]
  ].map(([province,area,lat,lng,count,facility])=>({province,area,lat,lng,count,facility}));
  const age=["0–17","18–29","30–44","45–59","60+"];
  const sex=["Nam","Nữ","Không ghi nhận"];
  const symptom=["Sốt nhẹ, đau họng","Ho khan","Mệt mỏi","Không triệu chứng","Đau đầu, nghẹt mũi"];
  const exposure=["Sự kiện cộng đồng giả định","Điểm giao thông mô phỏng","Nơi làm việc giả định","Hộ gia đình mô phỏng","Chưa xác định nguồn"];
  const dateLabel=d=>`${String(d).padStart(2,"0")}/08/2026`;
  const jitter=(n,a)=>{const v=Math.sin((n+1)*(a?12.9898:78.233))*43758.5453;return(v-Math.floor(v)-.5)*(a?.16:.12)};
  const cases=[]; let serial=1;
  CENTERS.forEach((c,ci)=>{
    const local=[];
    for(let j=0;j<c.count;j++){
      const n=serial++, cycle=n%12;
      const status=cycle<2?"new":(cycle===3||cycle===8)?"suspected":(cycle===5||cycle===9||cycle===11)?"recovered":"active";
      const receivedDay=1+((n*7+ci*3)%31), onsetDay=Math.max(1,receivedDay-(2+n%5));
      const item={id:`EPI-2608-${String(n).padStart(3,"0")}`,status,province:c.province,area:c.area,lat:c.lat+jitter(n,0),lng:c.lng+jitter(n,1),facility:c.facility,ageGroup:age[(n+ci)%age.length],sex:sex[(n*2+ci)%sex.length],receivedDay,onsetDay,sampledDay:Math.max(onsetDay,receivedDay-1),risk:n%6<2?"Cao":n%3===0?"Thấp":"Trung bình",symptom:symptom[(n+ci)%symptom.length],exposure:exposure[(n*3+ci)%exposure.length],sourceId:j>1&&j%3===0?local[j-2].id:null,contactIds:[],note:"Hồ sơ, quan hệ và tọa độ đều là dữ liệu mô phỏng; không liên quan đến người thật."};
      cases.push(item); local.push(item);
    }
    local.forEach((x,i)=>x.contactIds=[local[i+1],local[i+3],local[i-1]].filter(Boolean).slice(0,x.risk==="Cao"?3:2).map(v=>v.id));
  });
  const facilities=CENTERS.map((c,i)=>({id:`CS-${String(i+1).padStart(2,"0")}`,name:c.facility,province:c.province,lat:c.lat+.025,lng:c.lng-.018}));
  const byId=new Map(cases.map(x=>[x.id,x]));
  window.EPI_DATA={STATUS,CENTERS,cases,facilities,byId};
})();
