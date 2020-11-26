// lol this whole thing probably could be done in react but ssr go brrr

import Head from "next/head";
import { useState } from "react";
import {
  Page,
  Textarea,
  Text,
  Link,
  Grid,
  Spacer,
  Button,
  useToasts,
  useClipboard,
  Toggle,
  Col,
  User,
  Note,
  useTheme,
  Row,
} from "@geist-ui/react";
import { Copy, Github } from "@geist-ui/react-icons";

const metaImg =
  "https://f000.backblazeb2.com/file/jasonaa-static/img/wordcounter.png";
const center = { textAlign: "center" };

export default function Home(props) {
  const [, setToast] = useToasts();
  const theme = useTheme();
  const { copy } = useClipboard();
  const defaultStats = getStatsFromStorage() || {
    chars: 0,
    words: 0,
    sentences: 0,
  };

  const [text, setText] = useState(getTextFromStorage());
  const [textStats, setStats] = useState(defaultStats);
  function onChange(e) {
    const temp = e.target.value;
    setText(temp);
    localStorage.setItem("text", temp);
    setStats({
      chars: temp.length,
      // i love/hate regex but its kinda cool when it works.
      // s/o https://regexr.com/
      words: (temp.split(/(!+|\?+|\.+| +)/).length - 1) / 2,
      sentences: (temp.split(/(!+|\?+|\.+)/).length - 1) / 2,
    });
    localStorage.setItem("stats", JSON.stringify(textStats));
  }

  function getTextFromStorage() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("text");
    } else {
      return "";
    }
  }

  function getStatsFromStorage() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("stats"));
    } else {
      return "";
    }
  }

  return (
    <Page dotBackdrop>
      <Head>
        <title>Word Counter</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <meta name="title" content="Word Counter" />
        <meta
          name="description"
          content="Keep track of your document's word count!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wc.jasonaa.me/" />
        <meta property="og:title" content="Word Counter" />
        <meta
          property="og:description"
          content="Keep track of your document's word count!"
        />
        <meta property="og:image" content={metaImg} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://wc.jasonaa.me/" />
        <meta property="twitter:title" content="Word Counter" />
        <meta
          property="twitter:description"
          content="Keep track of your document's word count!"
        />
        <meta property="twitter:image" content={metaImg} />
      </Head>
      <Col align="middle">
        <Page.Header>
          <Text style={center} h1>
            Word Count.
          </Text>
          <Text p style={center}>
            Enter your text below and see your current word count! Don't worry
            about saving - text will auto-save to your browser's storage after
            every edit.
          </Text>
        </Page.Header>
        <Page.Content>
          <Textarea
            status="success"
            id="textarea"
            onChange={onChange}
            value={text}
            width="100%"
            placeholder="Enter your text here."
          />
          <Grid.Container alignItems="center" justify="space-evenly">
            <Grid xs>
              <Info noun="character" no={textStats.chars}></Info>
            </Grid>
            <Grid xs>
              <Info noun="word" no={textStats.words}></Info>
            </Grid>
            <Grid xs>
              <Info noun="sentence" no={textStats.sentences}></Info>
            </Grid>
          </Grid.Container>

          <Grid.Container alignItems="center" justify="space-evenly">
            <Button
              icon={<Copy />}
              auto
              onClick={() => {
                copy(text);
                setToast({ text: "Text copied.", type: "success" });
              }}
            >
              Copy to Clipboard
            </Button>
            <Note
              small
              type="secondary"
              label={"Theme"}
              style={{ marginTop: "1em", width: "10em" }}
            >
              <Spacer y={0.5} />
              <Toggle
                name="Dark Mode"
                onChange={props.themeToggle}
                initialChecked={props.currentTheme == "light" ? false : true}
              />
            </Note>
          </Grid.Container>
        </Page.Content>

        <Row justify="center">
          <User
            src="https://gravatar.com/avatar/d35776f3bec9c6459903f6a3204b63e4"
            name="Built by"
          >
            <User.Link href="https://github.com/jasonappah">
              @jasonappah
            </User.Link>
          </User>
          <Link href="https://github.com/jasonappah/wordcounter">
            <Button iconRight={<Github />} auto />
          </Link>
        </Row>
      </Col>
    </Page>
  );
}

function Info(props) {
  const noun = props.noun || "";
  const no = props.no || 0;
  return (
    <Text p b style={center}>
      {no} {noun}
      {no == 1 ? "" : "s"}.
    </Text>
  );
}
