// import TaleCard from "@/app/_components/TaleCard";
import MemberCard from "@/app/_components/MemberCard";
// import Newsreel from "@/app/_components/Newsreel";

export default async function Who() {
    let content, contentPartners, contentNews;
    const partnersInfo = [];
    try {
        let data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/who' +
            '?populate[0]=tales_of_1.immagine' +
            '&populate[1]=tales_of_1.logo' +
            '&populate[2]=tales_of_2.immagine' +
            '&populate[3]=tales_of_2.logo' +
            '&populate[4]=hero' +
            '&populate[5]=team_1' +
            '&populate[6]=team_2' +
            '&populate[7]=team_3' +
            '&populate[8]=team_4' +
            '&populate[9]=team_1.avatar' +
            '&populate[10]=team_2.avatar' +
            '&populate[11]=team_3.avatar' +
            '&populate[12]=team_4.avatar' +
            '&populate[13]=sub_hero_immagine',
            { next: { revalidate: 1000 }}
        );
        content = await data.json();

        let dataPartners = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/partner'+
            '?populate[0]=partner_1.immagine' +
            '&populate[1]=partner_2.immagine' +
            '&populate[18]=partner_1' +
            '&populate[19]=partner_2',
            { next: { revalidate: 1000 }}
        );
        contentPartners = await dataPartners.json();
        for(const [key, value] of Object.entries(contentPartners.data)) {
            if(key.startsWith('partner_')) {
                partnersInfo.push(value);
            }
        }

        // let dataNews = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/_api/news?populate=*',
        //     { next: { revalidate: 1000 }});
        // contentNews = await dataNews.json();
        // console.log(contentNews.data)

    } catch(error) {
        console.log(error);
    }

  return (
      <>
          <div className="w-full h-[80vh] mt-[79px] relative fadein-slower">
              <img
                  className='absolute inset-0 h-full w-full object-cover'
                  src={process.env.NEXT_PUBLIC_BASE_URL + content.data.hero.url}
                  alt={content.data.hero.alternativeText}
              />
          </div>

          {/*<section*/}
          {/*    className="flex flex-col md:flex-row gap-20 w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-20 pb-24">*/}
          {/*    <div className="flex flex-col gap-2 w-full">*/}
          {/*        <h2 className="font-bold text-4xl my-8">News</h2>*/}

          {/*        <Newsreel content={contentNews.data}/>*/}

          {/*    </div>*/}
          {/*</section>*/}

          <section
              className="flex flex-col md:flex-row gap-10 md:gap-20 w-[95vw] md:w-[80vw] mx-auto items-center justify-center px-4 md:px-8 pt-20 pb-24">
              <div className="flex flex-col gap-2 w-full md:w-2/4">
                  <h2 className="font-bold text-4xl mt-8">{content.data['sub_hero_titolo']}</h2>
                  <p className="w-full mt-2 pl-1 whitespace-pre-line">{content.data['sub_hero_descrizione']}</p>
                  <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4 mt-8 md:mt-4">
                      {partnersInfo &&
                          partnersInfo.map((el: any) => {
                              if (!el[0]) {
                                  return
                              } else {
                                      return (
                                          <div className="max-w-[200px] w-auto h-24 relative" key={Math.random()}>
                                              <img
                                                  width={200}
                                                  height={100}
                                                  className="rounded-xl"
                                                  src={process.env.NEXT_PUBLIC_BASE_URL + el[0].immagine.url}
                                                  alt={el[0].immagine.alternativeText}
                                              />
                                          </div>
                                      )
                                  }
                              })
                      }
                  </div>
              </div>
              <div className="w-full md:w-2/4 h-[500px] md:h-[450px] flex items-center justify-center bg-corpo-blue rounded-xl relative">
                  <img src="/logo.webp" alt="visit cremona logo" width={250} height={100}/>
                  {/*<img*/}
                  {/*    className="absolute inset-0 h-full w-full object-cover rounded-xl"*/}
                  {/*    src={process.env.NEXT_PUBLIC_BASE_URL + content.data['sub_hero_immagine'].url}*/}
                  {/*    alt={content.data['sub_hero_immagine'].alternativeText}*/}
                  {/*/>*/}
              </div>
          </section>

          <section className="bg-corpo-blue px-8 pt-20 pb-20 md:pb-24">
              <div className="w-[80vw] mx-auto">
                  <p className="text-white text-center md:text-left font-bold text-xl whitespace-pre-line">{content.data.motto}</p>
              </div>
              <div className="w-[75vw] mx-auto mt-12 md:mt-8 text-center md:text-right">
              <a href="/Visit Cremona_Brand Guide_V6.pdf" download target="_blank" rel="noopener noreferrer"
                 className="cursor-pointer w-[164px] px-4 py-3 text-black transition duration-500 hover:bg-corpo-orange bg-soft-orange rounded-full text-center">Download</a>
              </div>

          </section>

          {/*<section className="w-[90vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-16 pb-24">*/}
          {/*    <h2 className="font-bold text-4xl mt-8">{content.data['anime_titolo']}</h2>*/}
          {/*    <p className="w-full mt-8 pl-1 whitespace-pre-line md:columns-2 gap-8">{content.data['anime_descrizione']}</p>*/}

          {/*    <div className="flex flex-col md:flex-row gap-8 justify-center mt-16">*/}
          {/*        <TaleCard logo={[*/}
          {/*            process.env.NEXT_PUBLIC_BASE_URL + content.data['tales_of_1'][0].logo.url,*/}
          {/*            content.data['tales_of_1'][0].logo.alternativeText*/}
          {/*        ]} pic={[*/}
          {/*            process.env.NEXT_PUBLIC_BASE_URL + content.data['tales_of_1'][0].immagine.url,*/}
          {/*            content.data['tales_of_1'][0].immagine.alternativeText*/}
          {/*        ]}*/}
          {/*        />*/}

          {/*        <TaleCard logo={[*/}
          {/*            process.env.NEXT_PUBLIC_BASE_URL + content.data['tales_of_2'][0].logo.url,*/}
          {/*            content.data['tales_of_2'][0].logo.alternativeText*/}
          {/*        ]} pic={[*/}
          {/*            process.env.NEXT_PUBLIC_BASE_URL + content.data['tales_of_2'][0].immagine.url,*/}
          {/*            content.data['tales_of_2'][0].immagine.alternativeText*/}
          {/*        ]}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*</section>*/}

          <section className="w-[95vw] md:w-[80vw] mx-auto px-4 md:px-8 pt-8 pb-24 text-center">
              <h2 className="font-bold text-4xl mt-8">{content.data['team_titolo']}</h2>

              <div className="flex gap-12 justify-center mt-16 flex-wrap">

                  <MemberCard
                      avatar={[
                          process.env.NEXT_PUBLIC_BASE_URL + content.data['team_1'][0].avatar.url,
                          content.data['team_1'][0].avatar.alternativeText
                      ]}
                      name={content.data['team_1'][0].nome}
                      job={content.data['team_1'][0].ruolo}
                      link={content.data['team_1'][0]['profilo_linkedin']}
                  />

                  <MemberCard
                      avatar={[
                          process.env.NEXT_PUBLIC_BASE_URL + content.data['team_2'][0].avatar.url,
                          content.data['team_2'][0].avatar.alternativeText
                      ]}
                      name={content.data['team_2'][0].nome}
                      job={content.data['team_2'][0].ruolo}
                      link={content.data['team_2'][0]['profilo_linkedin']}
                  />

                  <MemberCard
                      avatar={[
                          process.env.NEXT_PUBLIC_BASE_URL + content.data['team_3'][0].avatar.url,
                          content.data['team_3'][0].avatar.alternativeText
                      ]}
                      name={content.data['team_3'][0].nome}
                      job={content.data['team_3'][0].ruolo}
                      link={content.data['team_3'][0]['profilo_linkedin']}
                  />

                  <MemberCard
                      avatar={[
                          process.env.NEXT_PUBLIC_BASE_URL + content.data['team_4'][0].avatar.url,
                          content.data['team_4'][0].avatar.alternativeText
                      ]}
                      name={content.data['team_4'][0].nome}
                      job={content.data['team_4'][0].ruolo}
                      link={content.data['team_4'][0]['profilo_linkedin']}
                  />
              </div>
          </section>

      </>
  );
}
