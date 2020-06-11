import React, { useState } from "react";
import db from "./firebase";
import firebase from "firebase";
import Form from "react-bootstrap/Form";
import googleSign from "./google-signin.png";
import Button from "react-bootstrap/Button";

const SignUpPage = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [myProfile, setMyProfile] = useState({
    city: "",
    profile: "",
    userId: "",
    name: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection("profiles")
      .doc(myProfile.userId)
      .set({
        ...myProfile,
      })
      .then(() => window.alert("done"));
  };

  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setMyProfile({
          ...myProfile,
          imageUrl: user.photoURL,
          userId: user.uid,
          name: user.displayName,
        });
      });
    console.log(myProfile);
  };
  return (
    <>
      <Button onClick={() => googleSignIn()}>
        <img src={googleSign} alt="google signIn img"></img>
      </Button>{" "}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="City"
            value={myProfile.city}
            onChange={(e) =>
              setMyProfile({ ...myProfile, city: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Profile"
            value={myProfile.profile}
            onChange={(e) =>
              setMyProfile({ ...myProfile, profile: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpPage;
