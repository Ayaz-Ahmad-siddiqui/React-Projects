import React, { useState, useEffect } from 'react';

const BookMarker = () => {
    const [webName, setWebName] = useState()
    const [webUrl, setWebUrl] = useState()
    const [bookmarks, setBookmarks] = useState([]);
    const [displayErr, setdisplayErr] = useState({
        nameErr: '',
        UrlErr: ''
    })

    const saveBookmark = (e) => {
        e.preventDefault();

        if (!validateForm(webName, webUrl)) {
            return false;
        }

        const bookmark = {
            name: webName,
            url: webUrl,
            id: Date.now(),
        };

        const updatedBookmarks = [...bookmarks, bookmark];
        // console.log(updatedBookmarks)
        setBookmarks(updatedBookmarks);

        setdisplayErr({ nameErr: '', UrlErr: '' })
        setWebName('');
        setWebUrl('');

    };

    const deleteBookmark = (id) => {
        const DelBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        console.log(DelBookmarks)
        setBookmarks(DelBookmarks);
    }

    function validateForm(webName, webUrl) {
        if (!webName) {
            setdisplayErr({ nameErr: 'Please enter your site Name', UrlErr: '' })
            return false;
            // alert('Please enter your site name')
        }

        if (!webUrl) {
            setdisplayErr({ nameErr: '', UrlErr: "Please enter your Url" })
            return false;
            // alert("Please enter your Url")
        }

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if (!webUrl.match(regex)) {
            alert('Please use a valid URL');
            return false;
        }

        return true;
    }

    const addhttp = (url) => {
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;
        }
        return url;
    };

    const handleNameErr = (e) => {
        setWebName(e.target.value)
        setdisplayErr({ ...displayErr, nameErr: '' })
    }

    const handleUrlErr = (Value) => {
        setWebUrl(Value)
        setdisplayErr({ ...displayErr, UrlErr: '' })
    }

    return (
        <div className="container">
            <div className="header clearfix">
                <h3 className="text-muted">Bookmarker</h3>
            </div>
            <div className="jumbotron">
                <h2>Bookmark Your Favorite Sites</h2>
                <form onSubmit={saveBookmark}>
                    <div className="form-group">
                        <label>Site Name</label>
                        <input type="text" className="form-control" value={webName} onChange={handleNameErr} placeholder="Website Name" />
                    </div>
                    <span className='text-danger'>{displayErr.nameErr}</span>
                    <div className="form-group">
                        <label>Site URL</label>
                        <input type="text" className="form-control" value={webUrl} onChange={e => handleUrlErr(e.target.value)} placeholder="Website URL" />
                    </div>
                    <span className='text-danger'>{displayErr.UrlErr}</span><br /><br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div className="row marketing">
                <div className="col-lg-12">
                    <div id="bookmarksResults">
                        {bookmarks.map((bookmark, id) => (
                            <div className="well" key={id}>
                                <h3>{bookmark.name}
                                    <a className="btn btn-default" target="_blank" href={addhttp(bookmark.url)}>Visit</a>
                                    <button className="btn btn-danger" onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>© 2016 Bookmarker, Inc.</p>
            </footer>
        </div>
    );
};

export default BookMarker;
