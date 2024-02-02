import imgs from '~/assets/imgs';

function About() {
    return (
        <div class="container text-center my-2">
            <h1 class="text-center">Giới thiệu về pet shop</h1>
            <p>Trang web thú cưng độc đáo được làm bởi sinh viên của đại học cần thơ, đa dạng các loại thú cưng</p>
            <img height="300" width="300" style={{ objectFit: 'cover' }} src={imgs.about.bia1} alt="" />
            <p>
                Tại đây, chúng tôi có sẵn đa dạng các dòng chó mèo cảnh, khách hàng có thể đến lựa chọn và đón ngay thú
                cưng về nhà.
            </p>
            <img height="300" width="300" style={{ objectFit: 'cover' }} src={imgs.about.bia2} alt="" />
            <p>Bên cạnh đó chúng tôi cũng bán kèm đa dạng các loại phụ kiện dành cho thú cưng của bạn</p>
            <img height="300" width="300" style={{ objectFit: 'cover' }} src={imgs.about.bia3} alt="" />
        </div>
    );
}
export default About;
