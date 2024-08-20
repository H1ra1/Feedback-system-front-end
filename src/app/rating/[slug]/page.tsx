'use client';

import BetweenUsersRating from '@/components/BetweenUsersRating';
import SelectUsersToRate from '@/components/SelectUsersToRate';
import { useState } from 'react';

interface SlugProps {
    params: {
        slug: string
    }
}

function Rating({ params }: SlugProps) {
    const [showRating, setShowRating] = useState<boolean>(false);

    return showRating ? (
        <BetweenUsersRating rating_user_code={params.slug} />
    ) : (
        <SelectUsersToRate />
    )
}

export default Rating;