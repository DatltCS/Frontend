import React from "react";
import "./BusRegistration.css";

function BusRegistration() {
    return (
        <>
            <div className="overlay">
                <div >
                    <main class="main-form">
                        <div class="sign-up-form">
                            <section class="wrapper-sign-up">
                                <div class="heading">
                                    <h1 class="text text-large">Đăng ký mở nhà xe trên CheapTicket</h1>

                                </div>
                                <form name="signin" class="form">
                                    <div class="input-control">
                                        <label for="hoten" class="input-label" hidden>Họ và tên </label>
                                        <input type="hoten" name="hoten" id="hoten" class="input-field" placeholder="Họ và tên" />
                                        <label for="sdt" class="input-label" hidden>Số điện thoại liên hệ</label>
                                        <input type="sdt" name="sdt" id="sdt" class="input-field" placeholder="Số điện thoại liên hệ" />

                                    </div>
                                    <div class="input-control">
                                        <label for="email" class="input-label" hidden>Email</label>
                                        <input type="email" name="email" id="email" class="input-field" placeholder="Email" />
                                        <label for="tenxe" class="input-label" hidden>Tên hãng xe</label>
                                        <input type="tenxe" name="tenxe" id="tenxe" class="input-field" placeholder="Tên hãng xe" />

                                    </div>
                                    <div class="input-control">
                                        <label for="tinhtp" class="input-label" hidden>Tên hãng xe</label>
                                        <input type="tinhtp" name="tinhtp" id="tinhtp" class="input-field" placeholder="Tỉnh/Thành phố" />
                                    </div>
                                    <div class="input-control">
                                    <input type="submit" name="submit" class="input-submit" value="Đăng ký" disabled />
                                </div>
                                </form>

                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default BusRegistration;