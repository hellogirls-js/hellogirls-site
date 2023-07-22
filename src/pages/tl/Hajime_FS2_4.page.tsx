import Script from "next/script";

import MainLayout from "component/MainLayout";
import HajimeFS2 from "assets/hajime_fs2.png";

export const runtime = "experimental-edge";

export default function TL({ title }: { title: string }) {
  return (
    <MainLayout heading={title}>
      <Script src="https://uchuu.yuukun.dev/oissu@1"></Script>
      <h2>The Surprise Buried in Yumenosaki</h2>
      <div style={{ width: "70%", margin: "auto" }}>
        <blockquote>
          Before wrapping up practice, Wataru pays Ra*bits a visit to check on
          Tomoya. During the heat of the moment, Hajime accidentally blurts out
          a secret. Tomoya takes note of this, and then...
        </blockquote>
        <p>
          A translation of Hajime&apos;s Feature Scout 2, 4 star card! Hope you
          enjoy.
        </p>
      </div>

      <div style={{ width: "50%", margin: "auto", padding: "20px 0px" }}>
        <div className="oissu">
          <figure>
            <img src={HajimeFS2.src} alt="hajime fs2" />
          </figure>
          <blockquote>
            <p>
              <b>Location:</b> ES Practice Room
            </p>
          </blockquote>
          <p>
            <b>Nazuna:</b> Good job during practice, everyone! I can tell
            you&apos;ve all grown so much. I can&apos;t help but be proud of my
            little rabbits… *sniff sniff*
          </p>
          <p>
            <b>Hajime:</b> Ehehe, Nii-chan, no need to get emotional.
          </p>
          <p>
            <b>Mitsuru:</b> We wouldn&apos;t be here without you, after all!
          </p>
          <p>
            <b>Tomoya:</b> That&apos;s right, Nii-chan. After leading us for so
            long, you can sit back and relax. I have everything under control.
            I&apos;m feeling more confident since I have a role model like you.
          </p>
          <p>
            <b>Nazuna:</b> Tomoya-chin…! <i>(He playfully cries some more)</i>
          </p>
          <blockquote>
            <p>
              The door opens suddenly and dramatically, as Wataru makes an
              entrance.
            </p>
          </blockquote>
          <p>
            <b>Wataru:</b> AMAZING! Hello, cute members of Ra*bits! How are you
            all doing today?
          </p>
          <p>
            <b>Tomoya:</b> H-Hibiki-senpai?! What are you doing here? Can&apos;t
            you see we&apos;re <i>clearly</i> practicing!
          </p>
          <p>
            <b>Mitsuru:</b> Hi, hi, senpai!
          </p>
          <p>
            <b>Wataru:</b> Hello, Mitsuru-chan! I wanted to check in on
            Tomo-chin. Ever since he started leading Ra*bits, I&apos;ve been
            dying to see his performance as a guiding figure~
          </p>
          <p>
            <b>Tomoya:</b> Ah… You don&apos;t have to.
          </p>
          <p>
            <b>Hajime:</b> Yes, Hibiki-senpai, you really don&apos;t need to.
            Tomoya-kun is doing a great job as a leader, so I have to ask you to
            not intrude on our rehearsals.
          </p>
          <p>
            <b>Tomoya:</b> Aha, Hajime… You don&apos;t need to grab my shoulder
            all of a sudden.
          </p>
          <p>
            <b>Wataru:</b> Oya? Hajime-chan, do you feel like I&apos;m taking
            your fellow Ra*bits away from you? There&apos;s no need for you to
            worry about that.
          </p>
          <p>
            <b>Hajime:</b>{" "}
            <i>
              <i>
                (I really hate to admit this, because having thoughts like this
                distresses me, but I really don&apos;t like Hibiki-senpai!)
              </i>
            </i>
          </p>
          <p>
            <i>
              <i>
                (He&apos;s so “AMAZING” and brilliant that Tomoya-kun pays more
                attention to him than to me. I want that attention instead!)
              </i>
            </i>
          </p>
          <p>
            <b>Wataru:</b> I&apos;ll take my leave now. Bye bye, Ra*bits~
          </p>
          <p>
            <b>Hajime:</b> I really wish that bomb went of-{" "}
            <i>(He covers his mouth)</i>
          </p>
          <p>
            <b>Nazuna:</b> What was that, Hajime-chin?
          </p>
          <p>
            <b>Hajime:</b> N-Nothing! I was just thinking out loud. Don&apos;t
            worry about it, Nii-chan…
          </p>
          <p>
            <b>Mitsuru:</b> You think a lot, Hajime! I should do that more!
          </p>
          <p>
            <b>Hajime:</b> Hehe, don&apos;t say that, Mitsuru-kun.
          </p>
          <p>
            <b>Nazuna:</b> Mmm… I have an exam tomorrow and it&apos;s worth a
            large chunk of my grade. I&apos;ll have to go now and study. Take
            care, my Ra*bits!
          </p>
          <p>
            <b>Mitsuru:</b> Uwoahhh, Nii-chan, wait for me! I need to hurry and
            dash if I wanna go to the bakery before it closes! Dash Dash~!
          </p>
          <p>
            <b>Nazuna:</b> Ahaha, come on Mitsuru-chin, let&apos;s go!
          </p>
          <p>
            <b>Mitsuru:</b> Yayyyy–!
          </p>
          <p>
            <b>Tomoya:</b> <i>(smiles)</i>
          </p>
          <p>
            <b>Hajime:</b> Well, Tomoya-kun, shall we go?
          </p>
          <p>
            <b>Tomoya:</b> … Actually, Hajime, there&apos;s something I wanted
            to ask you about.
          </p>
          <p>
            <b>Hajime:</b> …?
          </p>
          <p>
            <b>Tomoya:</b> Earlier, when Hibiki-senpai was here, you mentioned
            something about a “bomb”... What did you mean by that?
          </p>
          <p>
            <b>Hajime:</b> …! W-what do you mean, Tomoya-kun…?
          </p>
          <p>
            <b>Tomoya:</b> You said something about how you wished that bomb
            would go off… Bombs are very dangerous, and us as members of Ra*bits
            should never be in possession of life-threatening, illegal objects
            like bombs.
          </p>
          <p>
            <b>Hajime:</b> I-I was just thinking out loud! You know, sometimes
            my mind just wanders off, and at that moment it just happened to
            wander into a dark place about bombs and destruction!
          </p>
          <p>
            <b>Tomoya:</b> But, a second before that you were attentive…
          </p>
          <p>
            <b>Hajime:</b> Please, believe me, Tomoya-kun.
          </p>
          <p>
            <b>Tomoya:</b> … Hajime, if you aren&apos;t going to be honest with
            me, I&apos;ll be very disappointed.
          </p>

          <p>
            <b>Hajime:</b> <i>(...!)</i>
          </p>
          <p>
            <i>(I can&apos;t… I can&apos;t disappoint Tomoya-kun.)</i>
          </p>
          <p>
            <i>
              (... But I can&apos;t bring myself to tell him the truth. If I do,
              he might hate me forever!)
            </i>
          </p>
          <p>
            <i>( … )</i>
          </p>
          <p>
            {" "}
            <i>
              (I have to be honest… Because Tomoya-kun is my best friend. I
              can&apos;t hide anything from him. I can&apos;t disappoint him.)
            </i>
          </p>
          <p>
            <b>Hajime:</b> A-Alright! I&apos;ll admit it, I put a bomb in his
            room… But, I realized it would hurt a few innocent people. … And, it
            never detonated, anyways.
          </p>
          <p>
            I placed it in a hidden area in Yumenosaki, so even if it went off,
            no one would be hurt, so don&apos;t worry, Tomoya-kun.
          </p>
          <p>
            <b>Tomoya:</b> Wait, you did what?! … But, I feel like Hibiki-senpai
            would say “Amazing!” if he ever found out. I think he&apos;s
            immortal…
          </p>
          <p>
            <b>Hajime:</b> <i>(?!)</i>
          </p>
          <p>
            <b>Hajime:</b> T-Tomoya-kun? … You&apos;re not upset with me? I- I
            mean, I just admitted to doing such a horrible deed!
          </p>
          <p>
            <b>Tomoya:</b> What? No way! I&apos;ve wanted that Pervert out of my
            hair for years. Honestly, Hajime, you did me a favor, and I
            appreciate your efforts.
          </p>
          <p>
            <b>Hajime:</b> <i>(*blushes*)</i>
          </p>
          <p>
            <b>Hajime:</b>{" "}
            <i>
              (I-I can&apos;t believe it. He forgave me just like that! Even
              after I attempted to commit a crime…)
            </i>
          </p>
          <p>
            <i>( … )</i>
          </p>
          <p>
            <i>
              (Tomoya-kun, you have a great heart. I&apos;ll hold your kindness
              inside me forever…)
            </i>
          </p>
          <p>
            <i>( … )</i>
          </p>
          <p>
            <i>(Still… Does he actually feel that way about Hibiki-senpai…?)</i>
          </p>
          <p>
            <i>
              (Was my attempt at hurting Hibiki-senpai actually for nothing…
              Because Tomoya-kun already likes me more?)
            </i>
          </p>
          <p>
            Tomoya-kun… Do you hate Hibiki-senpai that much? Enough that
            you&apos;re okay with me bombing him?
          </p>
          <p>
            <b>Tomoya:</b> Haha… Don&apos;t worry about it. I was just
            exaggerating. Now, Hajime, can you show me where you buried the
            bomb? We better dispose of it before others get hurt. Who knows if
            the bomb is actually capable of detonating…
          </p>
          <p>
            <b>Hajime:</b> O-of course! Come follow me.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "The Surprise Buried in Yumenosaki",
    },
  };
}
