const Divider = ({ label }) => {

  return (
    <div className="divider--background">
      <div className="divider cont">
          <p className="divider__desc">{label}</p>
      </div>
    </div>
  )
}

export default Divider