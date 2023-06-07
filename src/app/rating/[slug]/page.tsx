import BetweenUsersRating from '@/components/BetweenUsersRating';

interface SlugProps {
    params: {
        slug: string
    }
}

async function Rating( { params }: SlugProps ) {
    
    return (
        <BetweenUsersRating rating_user_code={ params.slug } />
    )
}

export default Rating;