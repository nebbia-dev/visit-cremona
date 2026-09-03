import Carousel from "@/app/_components/Carousel";
import VisitCard from "@/app/_components/VisitCard";
import Link from "next/link";
import AnimatedHoverButton from "@/app/_components/AnimatedHoverButton";
import LocalMap from "@/app/_components/LocalMap";
import Event from "@/app/_components/Event";
import Stories from "@/app/_components/Stories";
import ContactForm from "@/app/_components/ContactForm";
import ExperienceSection from "@/app/_components/ExperienceSection";
import {getExperiences} from "@/app/_lib/domnia-experiences";
import getEvents from "@/app/_lib/edt-events";
// import Refresh from "@/app/_components/Refresh";

export default async function Home() {

    let content, contentLinks, contentExpImages, contentStories;
    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/homepage' +
            '?populate[0]=hero_carosello' +
            '&populate[1]=sub_hero_image' +
            '&populate[2]=card_1' +
            '&populate[3]=card_2' +
            '&populate[4]=visit_cards_immagine' +
            '&populate[5]=esperienze_classiche' +
            '&populate[6]=esperienze_contemporanee' +
            '&populate[7]=esperienze_uniche.immagine' +
            '&populate[8]=esperienze_uniche' +
            '&populate[9]=stories_gallery' +
            '&populate[10]=social_immagine' +
            '&populate[11]=banner_immagine' +
            '&locale=en',
            { next: { revalidate: 1000 }}
        );
        content = await data.json();

        const dataLinks = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/link',
            { next: { revalidate: 1000 }});
        contentLinks = await dataLinks.json();

        const dataStories = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/stories?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        contentStories = await dataStories.json();
        console.log(contentStories)

        let dataExpImages = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/experiences-images?populate=*&locale=en',
            { next: { revalidate: 1000 }});
        contentExpImages = await dataExpImages.json();

    } catch(error) {
        console.log(error);
    }

    const pages = await getExperiences('/en', { locale: 'en' });
    for(const page of pages) {
        for(const pic of contentExpImages.data) {
            if(pic.slug === page.slug) {
                page.imageUrl = pic.image.url;
                break;
            }
        }
    }

    const dataEvents = await getEvents('/en', {lang: 'en'});

  return (
      <>
          {/*<Refresh/>*/}
          <section className="mt-[79px] fadein-slower w-full">
              <Carousel pics={content.data['hero_carosello']}/>
          </section>

          <section
              className="flex flex-col md:flex-row gap-12 w-[95vw] md:w-[80vw] mx-auto justify-center items-center px-4 md:px-8 pt-20 pb-24">
              <div className="flex flex-col gap-2 md:w-2/4 w-full">
                  <h2 className="font-bold text-4xl mt-8">{content.data['sub_hero_titolo']}</h2>
                  <h3 className="text-3xl pl-1">{content.data['sub_hero_sottotitolo']}</h3>
                  <p className="w-full mt-2 pl-1 whitespace-pre-line">{content.data['sub_hero_descrizione']}</p>
                  <div className="w-full text-right mt-8">
                      <Link href="/en/discover" className="font-bold underline relative">
                          <AnimatedHoverButton content="Discover the territory"/>
                      </Link>
                  </div>
              </div>
              <div className="w-full h-[400px] md:w-2/4 md:h-auto relative">
                  {content.data['sub_hero_image']
                      ? <img
                          className="absolute inset-0 h-full w-full object-cover object-left rounded-xl"
                          src={process.env.NEXT_PUBLIC_BASE_URL + content.data['sub_hero_image'].url}
                          alt={content.data['sub_hero_video'].alternativeText}
                          />
                      : content.data['sub_hero_video']
                          ? <iframe title="Presentation video" className="rounded-xl" src={content.data['sub_hero_video']} width="100%" height="400"
                                    frameBorder="0" scrolling="no"></iframe>
                          : <></>
                  }
              </div>
          </section>
          {/*default: pt-20*/}
          <section className="w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pb-24">
              <h2 className="font-bold text-4xl mt-8 mb-12">Discover what your local area has to offer</h2>
              <LocalMap homepage={true} autoFilter={0} pages={pages}/>
          </section>

          <section className="flex flex-col gap-8 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pb-24">
              <div className="flex flex-col min-[1200px]:flex-row items-center relative">
                  <div className="w-full min-[1200px]:w-2/4 relative z-5">
                      <h2 className="font-bold text-4xl mt-8">{content.data['visit_cards_titolo']}</h2>
                      <p className="w-full mt-8 pl-1 whitespace-pre-line">{content.data['visit_cards_descrizione']}</p>
                  </div>
                  <div
                      className="hidden min-[1200px]:w-3/4 min-[1200px]:h-[40vh] min-[1200px]:flex min-[1200px]:items-center min-[1200px]:justify-end">
                      <img
                          className="w-full"
                          width={500}
                          height={500}
                          src={process.env.NEXT_PUBLIC_BASE_URL + content.data['visit_cards_immagine'].url}
                          alt={content.data['visit_cards_immagine'].alternativeText}
                      />
                  </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                  <VisitCard
                      title={content.data['card_1'][0]['nome']}
                      price={content.data['card_1'][0]['prezzo']}
                      intro={content.data['card_1'][0]['intro']}
                      details={[
                          content.data['card_1'][0]['dettaglio_1'],
                          content.data['card_1'][0]['dettaglio_2'],
                          content.data['card_1'][0]['dettaglio_3'],
                          content.data['card_1'][0]['dettaglio_4'],
                          content.data['card_1'][0]['dettaglio_5']
                      ]}
                  />

                  <VisitCard
                      title={content.data['card_2'][0]['nome']}
                      price={content.data['card_2'][0]['prezzo']}
                      intro={content.data['card_2'][0]['intro']}
                      details={[
                          content.data['card_2'][0]['dettaglio_1'],
                          content.data['card_2'][0]['dettaglio_2'],
                          content.data['card_2'][0]['dettaglio_3'],
                          content.data['card_2'][0]['dettaglio_4'],
                          content.data['card_2'][0]['dettaglio_5']
                      ]}
                  />
              </div>
          </section>

          <ExperienceSection type="classic" name={content.data['esperienze_classiche'][0]['nome']} description={content.data['esperienze_classiche'][0]['descrizione']} pages={pages}/>
          <ExperienceSection type="contemporary" name={content.data['esperienze_contemporanee'][0]['nome']} description={content.data['esperienze_contemporanee'][0]['descrizione']} pages={pages}/>

          <section className="w-full bg-pastel-pink">
              <div
                  className="flex flex-col gap-16 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pb-24 pt-20">
                  <div className="flex flex-col md:flex-row justify-between">
                      <h2 className="font-bold text-4xl w-full text-left break-title mb-8 md:mb-0">{content.data['esperienze_uniche'][0]['nome']}</h2>
                      <p className="w-full md:max-w-[40vw]">{content.data['esperienze_uniche'][0]['descrizione']}
                      </p>
                  </div>

                  <div className="flex gap-4 justify-end">
                      <div className="relative w-full">
                          <div
                              className="absolute rounded-tr-xl rounded-bl-xl font-bold left-[1px] bottom-[1px] p-2 text-sm bg-white">{content.data['esperienze_uniche'][0]['titolo']}</div>
                          <img
                              className="border border-orange-500 rounded-xl w-full h-[50vh] object-cover"
                              alt="exp unica"
                              src={process.env.NEXT_PUBLIC_BASE_URL + content.data['esperienze_uniche'][0].immagine.url}
                              width={800}
                              height={400}/>
                      </div>
                  </div>

                  <div className="w-full text-right">
                      <Link href="/en/experiences/unique" className="font-bold underline relative">
                          <AnimatedHoverButton content="Go to Unique Experiences"/>
                      </Link>
                  </div>
              </div>
          </section>

          <section className="w-full bg-alt-blue text-white">
              <div className="flex flex-col items-center gap-8 w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-20 pb-20">
                  <img src="/icons/Lonely%20Planet%20Logo.png" alt="lonely planet logo" width={250} height={100}/>
                  <p className="font-bold text-xl text-center w-[60%]">
                      “Cremona, the capital city of violin-making, where the Torrazzo towers over the artisan workshops, amidst an atmosphere frozen in time and an extraordinary cultural heritage”</p>
                  <a href="https://www.youtube.com/watch?v=tr3nQWO6Jwk" target="_blank" rel="noopener noreferrer" className="cursor-pointer w-[164px] px-4 py-3 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full text-center">Watch the video</a>
              </div>
          </section>

          {dataEvents.events &&
              <section className="w-full">
                  <div
                      className="flex flex-col gap-16 w-[95vw] md:w-[80vw] mx-auto justify-center px-4 md:px-8 pb-24 pt-20">
                      <h2 className="font-bold text-4xl w-full text-left">Main events</h2>

                      <Event event={dataEvents.events[0]} locale="en"/>

                      <div className="w-full text-right mt-4">
                          <Link href="/en/events" className="font-bold underline relative">
                              <AnimatedHoverButton content="Go to Events"/>
                          </Link>
                      </div>
                  </div>
            </section>
          }

          {content.data['banner_immagine'].url && content.data['banner_testo'] &&
              <section className="flex flex-col gap-8 w-full justify-center pb-24">
                  <div className="relative w-full h-[400px]">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + content.data['banner_immagine'].url}
                             alt={content.data['banner_immagine'].alternativeText} width={2000} height={300}
                             className="w-full h-full object-cover"
                      />
                      <div
                          className="bg-corpo-blue/75 md:bg-transparent md:bg-linear-to-r from-corpo-blue to-transparent z-10 absolute w-full h-full top-0"></div>
                      <div
                          className="text-white text-3xl absolute top-0 z-12 font-bold w-[80vw] left-[10vw] h-full flex flex-col justify-center items-center md:items-start gap-8">
                          <p className="w-full md:w-[40%] text-center md:text-left">
                              <span className="text-corpo-orange">Bus transfer</span> Bergamo Orio al Serio Airport – Cremona direct service, <span className="text-corpo-orange">operating daily</span>, free luggage transport
                          </p>

                          <Link href="/en/plan"
                             className="w-[164px] cursor-pointer font-medium text-base px-3 py-3 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full text-center">
                              Find out more &gt;
                          </Link>

                      </div>
                  </div>
              </section>
          }

          <section className="flex flex-col gap-8 w-full justify-center pb-24">
              <Stories description={content.data['stories_testo']} gallery={contentStories.data}/>
          </section>

          <section className="w-full bg-pastel-yellow">
              <div className="flex w-[95vw] md:w-[80vw] mx-auto justify-between px-4 md:px-8 pt-20">
                  <div className="w-full md:w-2/4 flex flex-col gap-8 items-center md:items-start text-center md:text-left justify-center">
                      <h2 className="font-bold text-3xl">
                          {content.data['social_titolo']}
                      </h2>
                      <div className="flex gap-4 pb-16">
                          {contentLinks.data.facebook &&
                              <a href={contentLinks.data.facebook} target="_blank" rel="noopener noreferrer">
                                  <img src="/icons/facebook-blue.svg" alt="facebook logo" width={48} height={48}/>
                              </a>
                          }
                          {contentLinks.data.instagram &&
                              <a href={contentLinks.data.instagram} target="_blank" rel="noopener noreferrer">
                                  <img src="/icons/instagram-blue.svg" alt="instagram logo" width={48} height={48}/>
                              </a>
                          }
                          {contentLinks.data.whatsapp &&
                              <a href={contentLinks.data.whatsapp} target="_blank" rel="noopener noreferrer">
                                  <img src="/icons/whatsapp-blue.svg" alt="whatsapp logo" width={48} height={48}/>
                              </a>
                          }
                          {contentLinks.data.youtube &&
                              <a href={contentLinks.data.youtube} target="_blank" rel="noopener noreferrer">
                                  <img src="/icons/youtube-blue.svg" alt="youtube logo" width={48} height={48}/>
                              </a>
                          }
                      </div>
                  </div>
                  <img className="hidden md:block w-1/3"
                       src={process.env.NEXT_PUBLIC_BASE_URL + content.data['social_immagine'].url} alt={content.data['social_immagine'].alternativeText}/>
              </div>
          </section>

          <section className="w-full bg-alt-blue text-white">
              <div className="flex flex-col w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-20 pb-20 md:pb-24">
                  <h2 className="font-bold text-3xl mb-4">Stay in touch</h2>
                  <h4 className="font-bold">Sign up for the newsletter<br/>
                      Receive suggestions, event updates and news by email</h4>

                  <ContactForm newsletter={true}/>
              </div>
          </section>
      </>
  );
}
