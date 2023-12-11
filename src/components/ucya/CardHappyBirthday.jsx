import "./CardHappyBirthday.css";

const CardHappyBirhtday = () => {
  return (
    <div className="birthdayCard">
      <div className="cardFront">
        <h3 className="happy">HAPPY BIRTHDAY</h3>
        <div className="balloons">
          <div className="balloon-1"></div>
          <div className="balloon-2"></div>
          <div className="balloon-3"></div>
          <div className="balloon-4"></div>
        </div>
      </div>
      <div className="cardInside">
        <h3 className="back">HAPPY BIRTHDAY</h3>
        <p>Dear Uciaaa,</p>
        <p>
          Selamat ulang tahun! Semoga hari ini penuh dengan kebahagiaan dan
          keceriaan. Selamat merayakan hari istimewa ini bersama keluarga dan
          teman-teman terdekat. Semoga semua impian dan harapanmu menjadi
          kenyataan. Selamat ulang tahun yang indah! 🎉🎂🥳
        </p>
        <p className="name">*Semoga sidang KP lancar neh</p>
      </div>
    </div>
  );
};

export default CardHappyBirhtday;
