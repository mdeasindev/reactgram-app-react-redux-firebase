import firebase from '../config/fbConfig';

// Creating Account
export const createAccount = payload => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      firebase
        .firestore()
        .collection('users')
        .add({
          name: payload.name,
          uid: response.user.uid,
        });

      // if (response.user) {
      //   response.user.updateProfile({
      //     displayName: payload.name,
      //   });
      // }
      return response;
    })
    .catch(error => {
      return error;
    });
};

// Login
export const letsLogin = payload => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const letsLogout = () => {
  return firebase
    .auth()
    .signOut()
    .then(res => {})
    .catch(error => {});
};

// Share Post
export const sharePost = payload => {
  const ref = firebase.storage().ref();
  const name = +new Date() + '-' + payload.file.name;
  const metadata = {
    contentType: payload.file.type,
  };

  const task = ref.child(name).put(payload.file, metadata);
  task
    .then(snapshot => {
      return snapshot.ref.getDownloadURL();
    })
    .then(url => {
      return firebase
        .firestore()
        .collection('stories')
        .add({
          caption: payload.caption,
          image_url: url,
          uid: payload.uid,
          displayName: payload.displayName,
          likes: {},
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(doc => {});
    })
    .catch(console.error);

  return task;
};

// Like story
export const likeStory = async (doc_id, u_id) => {
  const response = await firebase
    .firestore()
    .collection('stories')
    .doc(doc_id)
    .get();
  const data = response.data();

  const oldLikes = data.likes ? data.likes : {};

  return firebase
    .firestore()
    .collection('stories')
    .doc(doc_id)
    .set(
      {
        likes: {
          ...oldLikes,
          [u_id]: true,
        },
      },
      { merge: true }
    );
};
