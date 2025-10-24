import React from 'react'
import './style/UploadForm.scss'

const UploadForm = () => {
    return (
        <section className='am-backdrop'>
            <form className='am-panel Upload-form'>
                <header>
                    <h2>파일 업로드</h2>
                    <p className='sub'>이미지와 간단한 메모를 함께 업로드 하세요.</p>
                </header>
                <div className='form-grid'>
                    <label htmlFor='title'>제목</label>
                    <input
                        id='title'
                        type='text'
                        placeholder='제목을 입력하세요'>
                    </input>
                </div>
                <div className='field'>
                    <label htmlFor='content'>내용</label>
                    <textarea
                        placeholder='제목을 입력하세요' row={3}>
                    </textarea>
                </div>
                <div className='field'>
                    <label htmlFor='content'>내용</label>
                    <textarea
                        placeholder='제목을 입력하세요' row={3}>
                    </textarea>
                </div>
            </form>
        </section>
    )
}

export default UploadForm