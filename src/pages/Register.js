import React, { useState, useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../config/Apis";
import MySpinner from "../components/Main/MySpinner";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 




const Register = () => {
    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "confirmPass": ""
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const avatar = useRef();



    const isStrongPassword = (password) => {
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
    }

    const register = (evt) => {
        evt.preventDefault();

        const process = async () => {
            if (user.password !== user.confirmPass) {
                setErr("Mật khẩu KHÔNG khớp!");
            } else if (!isStrongPassword(user.password)) {
                setErr("Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết hoa và một ký tự đặc biệt");
            } else {
                let form = new FormData();

                for (let field in user)
                    if (field !== "confirmPass")
                        form.append(field, user[field]);
                form.append("avatar", avatar.current.files[0]);
                setLoading(true)
                let res = await Apis.post(endpoints['register'], form);
                if (res.status === 201) {
                    nav("/sign-in");
                } else {
                    setErr("Hệ thống bị lỗi!");
                }
            }
        }

        if (user.password === user.confirmPass)
            process();
        else {
            setErr("Mật khẩu KHÔNG khớp!");
        }
    }

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setUser(current => {
            return { ...current, [field]: evt.target.value }
        })
    }
    return (<>

        {err === null ? "" : <Alert variant="danger">{err}</Alert>}
        <div>
            <main class="main-form" onSubmit={register}>
                <div class="sign-in-form">
                    <section class="wrapper">
                        <div class="heading">
                            <h1 class="text text-large">Đăng ký tài khoản</h1>

                        </div>
                        <form name="signin" class="form">
                            <div class="input-control">
                                <label for="ten" class="input-label" hidden>Tên đăng nhập</label>
                                <input type="text" name="ten" id="ten" class="input-field" value={user.username} onChange={(e) => change(e, "username")} placeholder="Tên đăng nhập" required />
                            </div>
                            <div class="input-control">
                                <label for="password" class="input-label" hidden>Mật khẩu</label>
                                <input type="password" name="password" id="password" class="input-field" value={user.password} onChange={(e) => change(e, "password")} placeholder="Mật khẩu" required />
                            </div>
                            <div class="input-control">
                                <label for="password" class="input-label" hidden>Xác nhận mật khẩu</label>
                                <input type="password" name="password" id="password" class="input-field" value={user.confirmPass} onChange={(e) => change(e, "confirmPass")} placeholder="Xác nhận mật khẩu" required />
                            </div>
                            {loading === true?<MySpinner />: <Button variant="info" type="submit">Đăng ký</Button>}
                        </form>
                    </section>
                </div>
            </main>
        </div>
    </>
    )
}

export default Register;