/* 

Problem Statement - Design a simple comment section for a blog

1. There will be a list of comments.
2. The comments can be replied only for a single level. ( There is only single level of replies, replies cannot be replied again ).
   So a single comment can have multiple replies associated with it but only upto 1 level. Sub Comments cannot be commented.
3. A comment or a reply can be deleted. 
4. A comment or a reply can be edited. 
5. Refresh should not update the state of your comment section.

Bonus Section - How would you handle multiple levels of replies.

Design Requirements.

Design a Text Box and Submit Button to register a comment.
Reply Button on the comments to register a reply ( Same as comment submit for each comment ).
Show the comments and the associated replies in a simple list format.

*/

/**
 * commentsList: [{id,title,replyList:[{id,reply}]}]
 * reply
 *
 */

import { useState } from "react";
import "./styles.css";

const initialCommentLists = {
  1: { title: "Comment 1" }
};

const initialReplyLists = {
  1: {
    1: "reply1",
    2: "reply2",
    3: "reply3",
    4: "reply4"
  },
  2: {
    1: "reply1",
    2: "reply2"
  }
};

export default function App() {
  const [commentLists, setCommentLists] = useState(initialCommentLists);
  const [replyLists, setReplyLists] = useState(initialReplyLists);
  const [comment, setComment] = useState("");

  const handleCreateComment = () => {
    setCommentLists((prev) => {
      return { ...prev, [new Date().getTime()]: { title: comment } };
    });
    setComment("");
  };

  const handleCommentDelete = (cI) => {
    let data = { ...commentLists };
    delete data[cI];
    let replyData = { ...replyLists };
    delete replyData[cI];
    setCommentLists(data);
    setReplyLists(replyData);
  };

  const handleReplyDelete = (cI, rI) => {
    let replyData = replyLists[cI];
    delete replyData[rI];
    setReplyLists((prev) => {
      return { ...prev, [cI]: replyData };
    });
  };

  return (
    <div className="App">
      <h1>Create Comments</h1>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => handleCreateComment()}>Create Comment</button>
      <h1>Commets list</h1>
      <ul>
        {Object.keys(commentLists).map((commentId) => {
          return (
            <div key={commentId}>
              <li>
                {commentLists[commentId].title}
                <button onClick={() => handleCommentDelete(commentId)}>
                  Delete Comment
                </button>
              </li>
              {replyLists[commentId] && (
                <ul>
                  {Object.keys(replyLists[commentId]).map((replyId) => {
                    return (
                      <li key={replyId}>
                        {replyLists[commentId][replyId]}
                        <button
                          onClick={() => handleReplyDelete(commentId, replyId)}
                        >
                          Reply Delete
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <hr />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
