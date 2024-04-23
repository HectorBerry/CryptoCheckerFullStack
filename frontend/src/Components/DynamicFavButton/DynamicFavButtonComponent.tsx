import React from 'react';

function DynamicFavButton(props: any) {
    return (
        <div className='m-3'>
            {
            props.isFavToken?
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => props.deleteFavToken(props.token.symbol)}>Remove from favourites</button>
            :
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => props.setFavToken(props.token.symbol)}>Add to favourites</button>
            }
        </div>
    );
}

export default DynamicFavButton;