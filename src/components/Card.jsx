const Card = ({ user, onCardClicked }) => {
  return (
    <article onClick={() => onCardClicked(user.id)}>
      <p>{user.name}</p>
    </article>
  );
};

export default Card;
