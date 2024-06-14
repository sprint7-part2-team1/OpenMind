const ListCardItem = ({ id, name, imageSource, questionCount, createAt }) => {
  return (
    <div>
      <div>
        <img src={`${imageSource}`} alt="프로필사진" />
        <div>{name}</div>
        <div>
          <div>
            <img src="" alt="이미지자리" />
            <span>받은 질문</span>
          </div>
          <div>{`${questionCount}개`}</div>
        </div>
      </div>
    </div>
  );
};

export default ListCardItem;