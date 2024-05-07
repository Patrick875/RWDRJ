import { ReactNode } from "react";

export interface navItem {
    text: string;
    to: string;
    subnavs?: subnav[]
}
export interface CarouselItem {
    img: string;

}
interface subnav {
    title: string;
    to: string
}

export interface sidenavType {
    page: string;
    link: string;
    icon: ReactNode,
    location: string;
}
export interface section {
    content: string;
    title: string;
    img?: string;
    moreLink: string;
}
export interface member {
    _id: string | undefined;
    names: string;
    title: string;
    positionOnPage: number;
    image?: string;
    socialMedias?: memberSocialMedia[]
}
enum socialmedia {
    facebook = 'facebook',
    twitter = 'twitter',
    instagram = 'instagram',
    linkedin = 'linkedin'
}
export interface memberSocialMedia {
    name: socialmedia,
    link: string,
}
export interface partner {
    _id: string | undefined;
    link: string;
    logo: string
}
export interface apipartner {
    link: string;
    logo: string;
}
export interface SiteData {
    _id: string | undefined;
    logo: string;
    title: string;
    description?: string;
    subtitle: string;
}
export type Statistic = {
    title: string,
    currentNumber: number,
    andMore: boolean,
}
export type heroSectionSchema = {
    sliderImages: string[],
    buttonText: string,
}
export type sectionSchema = {
    title: string,
    content: string,
    coverImage: string,
    linkText: string,
    link: string,
}
export interface contactusShema {
    phoneNumbers: string[],
    emails: string[],
    location: string,
    title: string,
    coverImage: string,
}
type aboutUsNumbersSchema = {
    title: string,
    statiticGroups: Statistic[]

}
type aboutUsWhatWeDoSchema = {
    title: string,
    sections: sectionSchema[],

}
export interface AboutContent {
    herosection: heroSectionSchema,
    whoWeAreSection: sectionSchema,
    whatWeDoSection: aboutUsWhatWeDoSchema,
    statisticSection: aboutUsNumbersSchema,
    twitterProfile: string,
}

export interface img {
    data?: string;
    url: string;
}
export interface digitalCover {
    id: string;
    url: string;
}
export interface Page {
    _id: string | undefined;
    title: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}
export interface contentSchema {
    content: string,
    quoted: boolean,
}

export interface advocacyPage {
    _id: string | undefined;
    name: string;
    title: string;
    subtitle: string;
    coverImage: string;
    content: contentSchema[],
    sections: sectionSchema[],
    videosection: string,
}

export interface ourTeamPage {
    _id: string | undefined;
    name: string;
    title: string;
    subtitle: string;
    coverImage: string;
}



export interface BlogPost {
    refId?: string;
    title: string;
    content: string;
    postedBy?: string;
    datePosted?: string;
    description?: string;
    coverImage: string;
    datestart?: string;
    postedDate?: string;
    dateend?: string;
}
export interface EventPost {
    refId?: string;
    title: string;
    content?: string;
    description: string;
    coverImage: string;
    datestart: string;
    postedDate?: string;
    dateend: string;
    datePosted?: string;

}
export type NewsItem = BlogPost | EventPost;

export interface trainingPage {
    _id: string | undefined;
    name: string;
    title: string;
    subtitle: string;
    coverImage: string;
    sections: [sectionSchema],
}



export interface digitalHealthPage {
    _id: string | undefined;
    name: string;
    titles: string[],
    content: string;
    subtitles: string[];
    coverImages: string[];
    section: sectionSchema;
}

export interface compaignPage {
    _id: string | undefined;
    name: string;
    title: string;
    subtitle: string;
    coverImage: string;
    content: contentSchema[];
    sections: sectionSchema[];
}


export interface aboutUsPage {
    _id: string | undefined;
    name: string;
    herosection: heroSectionSchema;
    whoWeAreSection: sectionSchema;
    whatWeDoSection: aboutUsWhatWeDoSchema;
    statisticSection: aboutUsNumbersSchema;
    twitterProfile: string;
}

// type video = {
//     url: string,
//     bg: string,
// }
export interface advocacyPage {
    _id: string | undefined;
    name: string;
    title: string;
    subtitle: string;
    coverImage: string;
    content: contentSchema[];
    sections: sectionSchema[];
    video: video | undefined;
}
export interface contactusPage {
    _id: string | undefined;
    name: string,
    phoneNumbers: string[],
    emails: string[],
    mapHeaderText: string,
    mapXcordinates: number,
    mapYcordinates: number,
    location: string,
    title: string,
    coverImage: string
}


export interface video {
    url: string;
    thumb: string;
    title: string;
}