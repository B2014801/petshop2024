import { UpdateUserInforForm } from '~/components/form';

function Profile() {
    return (
        <div class="container my-2" v-if="user != null">
            <hr />
            <h3 class="text-center text-uppercase">Thông tin cá nhân</h3>
            <UpdateUserInforForm isShowImg={true} />
        </div>
    );
}

export default Profile;
