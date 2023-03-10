import React from 'react';
import styles from './styles.module.scss';
import { generateRandomColor } from '@/utils/general';

interface SimpleRankProps {
    rank: RankItem[]
}


interface RankItem {
    key:   number
    label: string
    value: number
    icon?: string
}

function SimpleRank( props: SimpleRankProps ) {
    return (
        <div className={`${styles['simple-rank']} flex flex-column flex-gap-20`}>
            { props.rank.map( ( item: RankItem ) => (
                <div className={`${styles['simple-rank__item']} flex flex-justify-between flex-align-center`} key={ `simple-rank-item-${item.key}` }>
                    <div className={`flex flex-align-center flex-gap-10`}>
                        { item.icon && (
                            <div className={`${styles['simple-rank-icon']} flex flex-align-center flex-justify-center`}>
                                <span>{ item.icon }</span>
                            </div>
                        ) }
                        
                        <p>{ item.label }</p>
                    </div>
                    <div>
                        <p>{ item.value }</p>
                    </div>
                </div>
            ) ) }
            
        </div>
    )
}

export default SimpleRank;
