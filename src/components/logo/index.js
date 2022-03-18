const LogoIcon = () => {
    return (
        <div style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#1B1B1B",
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
                IDEA
            </p>
            <p
                style={{
                    borderRadius: "10px",
                    backgroundColor: "#33EFAB",
                    width: "50px",
                    margin: "0 auto",
                    fontWeight: "bold",
                }}
            >
                Fly
            </p>
        </div>
    );
};

export default LogoIcon;