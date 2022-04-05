const LogoIcon = () => {
    return (
        <div style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#163D3C",
            color: "white",
            borderRadius: "50px",
            textAlign: "center",
        }}
        >
            <p
                style={{
                    paddingTop: "10px",
                    margin: "0 auto",
                    fontWeight: "bold",
                }}
            >
                Idea
            </p>
            <p
                style={{
                    borderRadius: "10px",
                    backgroundColor: "white",
                    color:"#163D3C",
                    padding:"0 5px",
                    margin: "0 auto",
                    fontWeight: "bold",
                    width:"fit-content"
                }}
            >
                Hub
            </p>
        </div>
    );
};

export default LogoIcon;