<script>
    import axios from "axios";
    import { auth } from "../stores";

    let values = {
        email: "",
        password: "",
    };

    const resetValues = () => {
        values.email = "";
        values.password = "";
    };

    const onLogin = async () => {
        try {
            await auth.login(values.email, values.password);
            resetValues();
        } catch (err) {
            alert("Login failed");
        }
    };
</script>

<!-- login-box start-->
<div class="auth-content-box">
    <div class="auth-box-main">
        <div class="auth-input-box">
            <input
                bind:value={values.email}
                type="email"
                name="floating_email"
                id="floating_email"
                class="auth-input-text peer"
                placeholder=" "
            />
            <label for="floating_email" class="auth-input-label">이메일</label>
        </div>
        <div class="auth-input-box">
            <input
                bind:value={values.password}
                type="password"
                name="floating_email"
                id="floating_password"
                class="auth-input-text peer"
                placeholder=" "
            />
            <label for="floating_email" class="auth-input-label">비밀번호</label
            >
        </div>
    </div>
    <div class="content-box-bottom">
        <div class="button-box">
            <button on:click={onLogin} class="button-base">로그인</button>
        </div>
    </div>
</div>
<!-- login-box end-->
