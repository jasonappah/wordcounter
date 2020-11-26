// lol this whole thing probably could be done in react but ssr go brrr

import Head from "next/head";
import { useState } from "react";
import { Page, Textarea, Text, Link, Grid, Spacer } from "@geist-ui/react";

export default function Home() {
  const [text, setText] = useState({
    "chars": 0,
    "words": 0,
    "sentences": 0
  });
  function onChange(e) {
    const temp = e.target.value;
    setText({
      chars: temp.length,
      // i love/hate regex but its kinda cool when it works.
      // s/o https://regexr.com/
      words: (temp.split(/(!+|\?+|\.+| +)/).length-1)/2,
      sentences: (temp.split(/(!+|\?+|\.+)/).length - 1)/2,
    });
  }
  return (
    <Page>
      <Head>
        <title>Word Counter</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Page.Header>
        <Text h1>Word Count.</Text>
      </Page.Header>
      <Page.Content>
        <Textarea
          onChange={onChange}
          width="100%"
          placeholder="Enter your text here."
        />
        <Grid.Container gap={2} justify="center">
          <Grid xs>
          <Info noun="character" no={text.chars}></Info>
          </Grid>
          <Grid xs>
          <Info noun="word" no={text.words}></Info>
          </Grid>
          <Grid xs>
            <Info noun="sentence" no={text.sentences}></Info>
          </Grid>
        </Grid.Container>
      </Page.Content>
      <Page.Footer>
        <Text>
          Built by <Link href="https://jasonaa.me/g">@jasonappah</Link>
        </Text>
        <Spacer></Spacer>
      </Page.Footer>
    </Page>
  );
}

function Info(props) {
  const noun = props.noun || "";
  const no = props.no || 0
  console.log(props.no)
  return (
    <Text>
      {no} {noun}{no == 1 ? "" : "s"}.
    </Text>
  );
}