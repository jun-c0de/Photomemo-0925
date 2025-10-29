import React from 'react'

const UserPostItem = ({ item }) => {
    return (
        <div className='inner post-card'>
            <div className="file-card-head">
                {(item?.number ?? "") !== "" && <span>No. {item.number}</span>}
                <h3>{item?.title ?? "제목없음"}</h3>
            </div>
            <div className="file-card-meta">
                {item?.updateAt && (
                    <p className='file-card-content'>{item.content}</p>
                )}
                {files?.length > 0 && (
                    {
                        files.map((src, idx) => (
                            <img key={idx} src={src} alt={`file-${idx}`} className='file-card-image' />
                        ))
                    }
                )}
            </div>
        </div>
    )
}

export default UserPostItem