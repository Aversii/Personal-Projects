import { StyledComponent } from "styled-components";

declare module "styled-components"{
    export interface DefaultTheme{
        title: string;

        colors:{
            primaryBackground:string;
            secundaryBackground:string;
            terciaryBackground:string;
            primaryTxt:string;
            secundaryTxt:string;
            terciaryTxt:string;
        }
    }
}