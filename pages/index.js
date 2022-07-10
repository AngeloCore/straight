import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import axios from "axios";

export default function Home() {
  const [opacity, setOpacity] = useState(5);
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const hiddenFileInput = useRef(null);

  const handleSubmit = async () => {
    resetStatus();
    const d = await axios.post("/api/generate", {
      image: file,
      opacity: opacity,
    });

    if (d.data?.success === false) {
      const status = document.getElementById("uploadStatus");
      status.innerText = d.data.message
        ? d.data.message
        : "Cannot load the given image.";
      status.style.color = "#ff0000";
    }

    const img = "data:image/png;base64," + d.data;

    setImage(img);
    document.getElementById("outputImage").src = img;
  };

  const handleUpload = () => {
    hiddenFileInput.current.click();
  };

  const resetStatus = () => {
    const status = document.getElementById("uploadStatus");
    status.style.color = "transparent";
  };

  const handleUploadChange = async () => {
    const file = document.getElementById("file")?.files[0];
    if (!file) return;
    const base64 = await getBase64(file);
    setFile(base64);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (file) document.getElementById("outputImage").src = file;
  }, [file]);

  return (
    <>
      <Head>
        <title>Be Straight!</title>
      </Head>
      <Container>
        <Title>Be Straight!</Title>
        <TextContainer>
          <Text>
            We at <Link href="">Be Straight</Link> have nothing against the
            LGBTQ+ community, we just don&apos;t want pride month to exist.
          </Text>
          <Text>
            Because there&apos;s no need for it... You all did it to show support,
            but it&apos;s your decision to join the LGBTQ+ community, you will suffer
            the consequences.
          </Text>
          <Text>
            The only thing pride month does is make heterosexuals even angrier.
            Just because you are gay, lesbian or have a gender other than
            male/female doesn&apos;t make you special, you can&apos;t take a whole month
            just for yourself or do anything you like gay, for example the moon
            isn&apos;t gay... The moon has no gender...
          </Text>
          <Text>
            Please stop with this pride month stuff and rainbow flags everywhere
            because it&apos;s so annoying and doesn&apos;t even help you, it makes things
            worse.
          </Text>
          <Text>
            But still, if you still think that you&apos;re better than the other
            people just because you&apos;re part of the LGBT community, you&apos;re wrong,
            you&apos;re not better than any other people.
          </Text>
          <Text>
            Also many members of the LGBT community want us to join in the LGBT
            community too, that&apos;s our decision and you have no right to
            manipulate it...
          </Text>
          <SpecialText>
            If you support heterosexual(s), then generate your heterosexual pfp
            below and use it!
            <br />
            If you have a month just for you, then we&apos;ll have one too! If the
            pride month is removed, then the straight month will also be removed
          </SpecialText>
        </TextContainer>
        <GeneratorContainer>
          <UploadStatus id={"uploadStatus"}>Success!</UploadStatus>
          <GeneratorBox>
            <OutputImage id={"outputImage"} />
            <Configure>
              <OpacityLabel>
                Opacity:
                <OpacityRange
                  type="range"
                  min="0"
                  max="9"
                  value={opacity}
                  onChange={(e) => setOpacity(e.target.value)}
                />
              </OpacityLabel>
              <SubmitButton onClick={handleUpload}>Upload</SubmitButton>
              <SubmitButton
                onClick={handleSubmit}
                disabled={file ? false : true}
              >
                Submit
              </SubmitButton>
              <DownloadButton
                disabled={image ? false : true}
                href={image || "#"}
                download="generated.png"
              >
                Download
              </DownloadButton>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleUploadChange}
                accept="image/*"
                id={"file"}
                style={{ display: "none" }}
              />
            </Configure>
          </GeneratorBox>
        </GeneratorContainer>
        <Footer>
          Powered by{" "}
          <Link href="https://github.com/AngeloCore/straightjs">
            straight.js
          </Link>{" "}
          | <Link href="https://github.com/AngeloCore/straight">Github</Link> |
          Copyright © {new Date().getFullYear()} Angelo II
        </Footer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 60px 150px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    margin: 75px 10px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
`;

const TextContainer = styled.div`
  margin-top: 50px;
  text-align: left;
`;

const Text = styled.p`
  color: #aaa;
  font-size: 20px;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;

const SpecialText = styled.p`
  color: #fff;
  font-size: 15px;
  text-align: center;
  margin-top: 40px;
  font-family: "Open Sans";
`;

const Link = styled.a`
  /* text-decoration: none; */
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  color: #aaa;
  transition: 200ms linear;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const GeneratorContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const GeneratorBox = styled.div`
  display: flex;
  background: #181818;
  padding: 20px 40px;
  border-radius: 15px;
  /* min-height: 300px; */
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: block;
    padding: 20px 10px;
  }
`;

const OutputImage = styled.img`
  width: 300px;
  max-width: 500px;
  border: 1px solic #aaa;
  cursor: pointer;
  transition: 200ms linear;
  &:hover {
    opacity: 0.7;
  }
`;

const UploadStatus = styled.p`
  color: transparent;
  margin-bottom: 10px;
  transition: 200ms linear;
  user-select: none;
`;

const Configure = styled.div`
  /* margin-top: auto; */
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OpacityLabel = styled.label`
  color: #aaa;
`;

const OpacityRange = styled.input`
  width: 175px;
  height: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #0363d5;
  border-radius: 50px;
  appearance: none;
  outline: none;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: #3592ff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  height: 50px;
  width: 120px;
  color: #000;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  transition: 100ms linear;
  background: #aaa;
  border-radius: 5px;
  box-shadow: 0 5px 0 #767676;
  margin-bottom: 15px;
  &:active {
    box-shadow: none;
    transform: translateY(5px);
  }
  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
  &:disabled:active {
    box-shadow: 0 5px 0 #767676;
    transform: none;
  }
`;

const DownloadButton = styled.a`
  height: 35px;
  padding-top: 12.5px;
  width: 120px;
  color: #000;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  transition: 100ms linear;
  background: #00c04b;
  border-radius: 5px;
  box-shadow: 0 5px 0 #008b36;
  text-decoration: none;
  outline: none;
  ${(props) => {
    if (props.disabled)
      return `
   pointer-events: none;
   opacity: 0.7;`;
  }}
  &:active {
    box-shadow: none;
    transform: translateY(5px);
  }
`;

const Footer = styled.p`
  margin-top: 30px;
  color: #aaa;
  font-size: 15px;
`;
