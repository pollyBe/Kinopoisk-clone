import { IMovie } from "../../types/types";

interface IActorProps{
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: string;
  posterUrl: string;
  growth?: number;
  birthday?: string;
  death?: string;
  age?: number;
  birthplace?: string;
  deathplace?: string;
  spouses?: string[];
  hasAwards: number;
  profession: string;
  facts: string[];
  films: IMovie[];
}

const ActorInfo = ({personId,
nameRu,
nameEn,
sex,
posterUrl,
growth,
birthday,
death,
age,
birthplace,
deathplace,
spouses,
hasAwards,
profession,
webUrl,
facts,
films}:IActorProps) => {
  return (<>
  hi
  </>)
}
export default ActorInfo