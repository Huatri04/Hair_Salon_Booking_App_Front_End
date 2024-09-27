import { Image } from "antd";
import "./index.css";
function Contact() {
  return (
    <div className="content_contact">
      <div className="text_contact">
        <h1>Liên Hệ Với Hair Haven</h1>
        Address: 47 Hoang Dieu 2, Quan 9, thanh pho Ho Chi Minh
        <br />
        Phone number: 0886122578
        <br />
        Giờ mở cửa: Thứ Hai - Thứ Bảy: 7:00 AM - 8:00 PM
        <br />
        Email: tritvhse182903@fpt.edu.vn
        <br />
      </div>
      <div className="container_img_contact">
        <Image
          width={400}
          height={200}
          src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/theme-park-177148_960_720%20(1).jpg?alt=media&token=87cd9707-4868-4b89-bd7d-141fbebe434d"
          alt=""
        />
        <Image
          width={400}
          height={200}
          src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/Screenshot%202024-09-26%20205442.png?alt=media&token=901e2af5-cf9f-46e6-9fc5-4d6ac6bfff2b"
          alt=""
        />
        <Image
          width={400}
          height={200}
          src="https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Contact;
