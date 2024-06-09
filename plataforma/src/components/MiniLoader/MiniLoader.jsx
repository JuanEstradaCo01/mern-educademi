import { Blocks } from 'react-loader-spinner'

function MiniLoader() {
    return (
        (<Blocks
            height="21"
            width="30"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
        />)
    )
}

export default MiniLoader;