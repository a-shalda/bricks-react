type DividerProps = {
  label: string
}

const Divider = ({ label }: DividerProps) => {

  return (
    <div className="divider--background">
      <div className="divider cont">
        <p className="divider__desc">{label}</p>
      </div>
    </div>
  )
}

export default Divider