import { useEffect, useState } from "react"
import { RankingUsuarios } from "../../components/Ranking/Ranking";

export function RankingPage({rankingChecked}) {
    return <RankingUsuarios rankingChecked={rankingChecked}/>
  }
