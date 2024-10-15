<script>
  import { auth } from "../stores";

  let values = {
    name: "",
    email: "",
    password: "",
  };

  const resetValues = () => {
    values.name = "";
    values.email = "";
    values.password = "";
  };

  const onRegister = async () => {
    try {
      await auth.register(values.name, values.email, values.password);
      resetValues();
    } catch (err) {
      alert("Login failed");
    }
  };
</script>

<!-- register-box start-->
<div class="auth-content-box">
  <div class="auth-box-main">
    <div class="auth-input-box">
      <input
        type="test"
        bind:value={values.name}
        name="floating_email"
        id="floating_name"
        class="auth-input-text peer"
        placeholder=" "
      />
      <label for="floating_email" class="auth-input-label">이름</label>
    </div>
    <div class="auth-input-box">
      <input
        type="email"
        bind:value={values.email}
        name="floating_email"
        id="floating_email"
        class="auth-input-text peer"
        placeholder=" "
      />
      <label for="floating_email" class="auth-input-label">이메일</label>
    </div>
    <div class="auth-input-box">
      <input
        type="password"
        bind:value={values.password}
        name="floating_email"
        id="floating_password"
        class="auth-input-text peer"
        placeholder=" "
      />
      <label for="floating_email" class="auth-input-label">비밀번호</label>
    </div>
    <div class="auth-input-box">
      <input
        type="password"
        name="floating_email"
        id="floating_password_check"
        class="auth-input-text peer"
        placeholder=" "
      />
      <label for="floating_email" class="auth-input-label">비밀번호 확인</label>
    </div>
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button on:click={onRegister} class="button-base">회원가입</button>
    </div>
  </div>
</div>
<!-- register-box end-->
