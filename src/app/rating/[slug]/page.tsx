'use client';

import BetweenUsersRating from '@/components/BetweenUsersRating';
import SelectUsersToRate from '@/components/SelectUsersToRate';
import colors from "@/styles/colors.module.scss";
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface SlugProps {
    params: {
        slug: string
    }
}

function Rating({ params }: SlugProps) {
    const [showRating, setShowRating] = useState<boolean>(false);
    const [availableRating, setAvailableRating] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function ratingStatus() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${params.slug}/`);

        setIsLoading(false);

        if (!response.ok)
            return false;

        setAvailableRating(true);
    }

    useEffect(() => {
        ratingStatus();
    }, []);

    return isLoading || !availableRating ? (
        <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
            <h1>{isLoading ? <Spinner color={colors.highlightColor} /> : 'Avaliação indisponível'}</h1>
        </div>
    ) : showRating ? (
        <BetweenUsersRating rating_user_code={params.slug} />
    ) : (
        <SelectUsersToRate ratingUserCode={params.slug} next={(next) => setShowRating(next)} />
    )
}

export default Rating;