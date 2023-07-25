import { ReactNode, useContext, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

import styles from "./styles/Cat.module.scss";

import { DarkModeContext } from "context/DarkModeContext";
import MainLayout from "component/MainLayout";
import { IconX } from "@tabler/icons-react";

const MOOMOO_DAY = "2018-10-20";

function WikiLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={`https://en.wikipedia.org/wiki/${href}`} target="_blank">
      {children}
    </Link>
  );
}

function Contents() {
  return (
    <div className={styles.wikiContents}>
      <h4>Contents</h4>
      <ol>
        <li>
          <Link href="#earlylife">Early Life</Link>
        </li>
        <li>
          <Link href="#appearance">Appearance</Link>
        </li>
        <li>
          <Link href="#behavior">Behavior</Link>
          <ol>
            <li>
              <Link href="#feedinghabits">Feeding habits</Link>
            </li>
            <li>
              <Link href="#beingheld">Being held</Link>
            </li>
          </ol>
        </li>
        <li>
          <Link href="#gallery">Gallery</Link>
        </li>
      </ol>
    </div>
  );
}

function GalleryPic({ src }: { src: string }) {
  return (
    <div className={styles.wikiGalleryPic}>
      <Image src={src} alt={"moo moo"} width={250} height={200} />
    </div>
  );
}

export default function Cat() {
  const { colorTheme } = useContext(DarkModeContext);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: img } = useSWR("/api/moomoo/portrait", fetcher);
  const { data: pics } = useSWR("/api/moomoo", fetcher);

  return (
    <MainLayout heading="cat wiki :3">
      <div className={`${styles.cat} ${styles[colorTheme]}`}>
        <div className={styles.catWikiHeader}>
          <h2>Maestro (cat)</h2>
        </div>
        <div className={styles.catWikiContent}>
          <div className={styles.catWikiInfo}>
            <h4>Maestro</h4>
            <div className={styles.catWikiInfoBox}>
              <Image
                src={img}
                alt="moo moo on her 3rd birthday"
                width={271}
                height={203}
              />
              <div className={styles.catWikiBoxCaption}>
                Maestro on her third birthday in 2021
              </div>
              <table className={styles.catWikiBoxTable}>
                <tr>
                  <th className={styles.catWikiTableLabel}>Other name(s)</th>
                  <td>Moo Moo</td>
                </tr>
                <tr>
                  <th className={styles.catWikiTableLabel}>
                    <WikiLink href="Species">Species</WikiLink>
                  </th>
                  <td>
                    <em>
                      <WikiLink href="Cat">Felis Catus</WikiLink>
                    </em>
                  </td>
                </tr>
                <tr>
                  <th className={styles.catWikiTableLabel}>Sex</th>
                  <td>Female</td>
                </tr>
                <tr>
                  <th className={styles.catWikiTableLabel}>Born</th>
                  <td>
                    {dayjs(MOOMOO_DAY).format("MMMM D, YYYY")} (age{" "}
                    {dayjs().diff(MOOMOO_DAY, "year")})<br />
                    <WikiLink href="St._Louis">St. Louis, MO</WikiLink>
                  </td>
                </tr>
                <tr>
                  <th className={styles.catWikiTableLabel}>Occupation</th>
                  <td>Professional cat</td>
                </tr>
                <tr>
                  <th className={styles.catWikiTableLabel}>Known for</th>
                  <td>Being a cute little sweetie pie</td>
                </tr>
              </table>
            </div>
          </div>

          <p>
            Maestro (born {dayjs(MOOMOO_DAY).format("MMMM D, YYYY")}), more
            commonly known as Moo Moo, is a female{" "}
            <WikiLink href="Bicolor_cat">black &amp; white</WikiLink>{" "}
            <WikiLink href="Domestic_short-haired_cat">
              domestic short-hair
            </WikiLink>{" "}
            cat who lives with the owner of this website, Son. Maestro is a
            popular cat among Son&apos;s friends who is known for her cow-like
            pattern, having a squeaky and chirpy meow, and little legs.
          </p>

          <Contents />

          <h3 id="earlylife">Early Life</h3>
          <p>
            Maestro was a stray cat for two years prior to being taken in by a
            local shelter in St. Louis in October of 2020. When she was brought
            to the shelter, Maestro was diagnosed with a respiratory illness and
            received treatment for a month. It is theorized that this illness
            affected her ability to meow properly.
          </p>

          <h3 id="appearance">Appearance</h3>
          <p>
            Maestro is a bicolor black and white cat with a mask &amp; mantle
            pattern. She has green eyes and a cute, pink nose. Maestro&apos;s
            back and tail are mostly black in coloring while her belly is white
            and fuzzy. She has patches of black fur on her arms, right above her
            paws, that resemble a bracelet. Her left metacarpal and metacarsal
            paw pads are black while her right ones are pink, her digital pads
            are pink as well. Maestro&apos;s legs and tail are shorter than the
            average cat, although her legs aren&apos;t as short as a
            munchkin&apos;s and her tail isn&apos;t as short as a bobtail
            cat&apos;s.
          </p>
          <p>
            Maestro is most commonly seen wearing a pink bowtie collar with a
            bell attached. The color of the bell compliments her green eyes and
            pink little nose. Son&apos;s mom always suggests getting her a
            different colored collar but it just won&apos;t hit the same.
          </p>
          <h3 id="behavior">Behavior</h3>
          <p>
            Maestro is a very well-behaved cat. She loves people and does not
            scratch or bite anyone (minus Son), although she tends to hide from
            those with large shoes and loud voices. Maestro is also affectionate
            and tends to be clingy. She enjoys following Son around for no
            reason and taking naps in Son&apos;s lap.
          </p>
          <h4 id="feedinghabits">Feeding habits</h4>
          <p>
            Maestro becomes much more lively when it&apos;s almost meal time.
            When Son wakes up each morning, Maestro will walk all over them,
            chirp excessively, and even attempt to remove Son&apos;s blanket off
            him. After Maestro eats breakfast, she&apos;s much more calm.
            Although, before laying down for a nap she might acquire zoomies and
            run around the apartment, letting out a loud, gutteral meow as she
            does so. Before dinner, Maestro will follow Son around the apartment
            and squeak at her. Son set up an alarm that goes off whenever
            it&apos;s dinner time and when Maestro hears it she becomes
            energized, chirping much more than she usually will because
            she&apos; excited for food.
          </p>
          <h4 id="beingheld">Being held</h4>
          <p>
            Even though Maestro is the perfect size to be held like a baby, she
            does not enjoy being carried. If someone attempts to carry her,
            she&apos;ll get uncomfortable and force her way out of their arms.
          </p>

          <h3 id="gallery">Gallery</h3>
          <div className={styles.wikiGallery}>
            {pics.map((p: string) => (
              <GalleryPic key={p} src={p} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "about moo moo",
    },
  };
}
