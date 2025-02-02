import { useNavigate, useParams } from "react-router-dom"
import Header from "../../Components/Header/Header"
import style from './ActorPage.module.scss'
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import Button from "../../UI-Components/Button/Button";
import ActorInfo from "../../Components/ActorInfo/ActorInfo";
import { GetActorInfo } from "../../store/actorSlice";

const ActorPage = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { actor, loading, error } = useSelector((state:RootState) => state.actor);
  const { staffId } = useParams();
  const { container } = style;

  useEffect(() => {
    dispatch(GetActorInfo({staffId}));
  }, [staffId]);
  console.log(staffId)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (<div className={container}>
    <Header/>
    <Button onClick={() =>navigate(-1)}
    type='button' text='Back'/>
    {actor &&
    <ActorInfo
      personId={actor.personId}
      nameRu={actor.nameRu}
      nameEn={actor.nameEn}
      sex={actor.sex}
      posterUrl={actor.posterUrl}
      growth={actor.growth}
      birthday={actor.birthday}
      death={actor.death}
      age={actor.age}
      birthplace={actor.birthplace}
      deathplace={actor.deathplace}
      spouses={actor.spouses}
      hasAwards={actor.hasAwards}
      profession={actor.profession}
      webUrl={actor.webUrl}
      facts={actor.facts}
      films={actor.films}
    />}
    <Footer />
  </div>)
}
export default ActorPage