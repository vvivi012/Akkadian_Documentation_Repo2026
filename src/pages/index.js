import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import React from 'react';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/about">
            Learn about the project!
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <div className="text--center">
              <h2>About the Project</h2>
              <p className="text--left">
                Language shouldn't determine who gets access to quality technologies.
                As artificial intelligence (AI) becomes more central to our daily lives, the gap in AI performance 
                between high-resource and low-resource languages risks leaving many communities behind. 
                This website uses an Akkadian machine translation system as a case study to teach 
                natural language processing (NLP). Our goal is to explain how it was built: 
                finding and cleaning source datasets, training the model, and fine-tuning it for better accuracy. 
                By making the process behind creating translation systems for low-resource languages transparent 
                and easy to understand, we hope to raise awareness of this digital gap and show how it can be tackled. 
              </p>
            </div>
          </div>

          <div className="col col--6">
            <div className="text--center">
              <h2>Getting Started</h2>
              <p className="text--left">
                You might find some of these links helpful:
                <br className="custom-break"/>
                <ul>
                <li>Want to learn more about the team? Try <a href="/about">this link</a>.</li>
                <li>Curious about how the translation system was made? Visit <a href="/docs/creation/creation%201%20overview">our project overview</a>.</li>
                <li>Interested in learning more about Natural Language Processing or Neural Networks? See <a href="/docs/education/education%201%20overview">our educational content</a> or have a look at some <a href="/docs/other/1%20other%20additional%20videos">other resources</a>.</li>
                </ul>
                <small>i made this before i realized creation + education were merged into one, this is a note to change the words/hyperlinks! also maybe figure out a better way to split so the tab up there doesn't look mega huge</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// lowkey no idea what the description thing is? meta data maybe?
// padding-top--xl versus padding-top--lg
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} (custom tab title)`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main className="padding-top--xl padding-bottom--xl">
        <Features />
      </main>
    </Layout>
  );
}
