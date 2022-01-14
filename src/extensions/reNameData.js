import NotInterestedIcon from '@mui/icons-material/NotInterested';

const reName = (value) => {
    switch (value) {
        case null:
            return  <div className='h-100 d-flex justify-content-center align-items-center'>
                        <NotInterestedIcon  sx={{ fontSize: 24 }} /> 
                    </div>
        case 'body':
            return 'comment'
        default:
            return value
    }
}

export {reName}  