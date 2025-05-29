import React from "react";
import Display from "./Display";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function HomePage() {
  return (
    <>

      <Display />
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>OUR PRODUCTS</h1>
      <LeftSide
        logo={
          <i
            className="fa-solid fa-microchip"
            style={{ fontSize: "20rem" }}
          ></i>
        }
        heading="Proccessors"
        view_button="View All Proccessors"
        button_data={[
          "Intel® Core™ Ultra Processors",
          "Intel® Core™ Processors",
          "Intel® Xeon® Processors",
          "Intel® Xeon® CPU Max Series",
          "Intel Atom® Processors",
        ]}
        description={[
          "High-end processors with AI acceleration, ideal for premium laptops and creator PCs.",
          "Mainstream CPUs for everyday computing, gaming, and productivity.",
          "Server-grade processors designed for data centers, workstations, and enterprise workloads.",
          "High-performance Xeons with high bandwidth memory (HBM) for HPC and AI workloads.",
          "Power-efficient CPUs for IoT devices, entry-level systems, and embedded applications.",
        ]}
        link="/proccessors"
      />
      <RightSide
        logo={
          <i className="fa-solid fa-computer" style={{ fontSize: "20rem" }}></i>
        }
        heading="Systems & Devices"
        view_button="View All Systems & Devices"
        button_data={[
          "AI PCs Powered by Intel",
          "Gaming Systems",
          "Intel vPro® for Business",
          "Intel® Arc™ Discrete Graphics",
          "Intel® Wi-Fi Products",
        ]}
        description={[
          "Laptops/desktops with built-in Intel AI engines—sold by OEMs (e.g., Dell, HP).",
          "High-performance PCs built for gaming, powered by Intel CPUs and GPUs—sold by OEMs.",
          "Business-grade PC platform with Intel hardware-level security and remote manageability—sold via OEM systems.",
          "Intel’s dedicated graphics cards for gaming and content creation—sold directly to consumers or via OEMs.",
          "Wireless modules and adapters that enable fast, secure Wi-Fi in devices—sold to OEMs and developers.",
        ]}
        link="/Systems"
      />
      <LeftSide
        logo={
          <i className="fa-solid fa-brain" style={{ fontSize: "20rem" }}></i>
        }
        heading=" AI Accelerators"
        view_button="View All AI Accelerators"
        button_data={[
          "Intel® Gaudi® AI Accelerators",
          "Intel® Data Center GPU Flex Series",
        ]}
        description={[
          "Purpose-built AI chips optimized for deep learning training and inference in data centers.",
          "Versatile GPUs designed for AI inference, media streaming, and cloud workloads—targeted at scalable deployments.",
        ]}
        link="/Acceleraters"
      />
      <RightSide
        logo={
          <i
            className="fa-solid fa-network-wired"
            style={{ fontSize: "20rem" }}
          ></i>
        }
        heading="Network to Edge"
        view_button="View All Network to Edge Products"
        button_data={[
          "Edge and Embedded Processors",
          "Intel® Ethernet Products",
          "Intel® Infrastructure Processing Unit (Intel® IPU)",
        ]}
        description={[
          "Power-efficient Intel CPUs for edge computing, IoT, robotics, and industrial automation—sold to OEMs and developers.",
          "High-performance Ethernet controllers and adapters for fast, reliable networking in servers and data centers.",
          "Specialized chips that offload infrastructure tasks from CPUs in cloud and enterprise data centers.",
        ]}
        link="/Networks"
      />
      <LeftSide
        logo={
          <i
            className="fa-solid fa-boxes-stacked"
            style={{ fontSize: "20rem" }}
          ></i>
        }
        heading="FPGAs & Programmable Devices"
        view_button="View All FPGAs & Programmable Devices"
        button_data={[
          "FPGAs, SoC FPGAs, and CPLDs",
          "Quartus® Development Software & Tools",
          "Intellectual Property",
          "FPGA Development Kits",
          "Acceleration Boards & Platforms",
        ]}
        description={[
          "Customizable logic chips used in networking, automotive, defense, and industrial systems—sold to engineers and system designers.",
          "Intel’s official IDE and toolkit for designing, simulating, and programming FPGAs.",
          "Pre-built IP cores (modules) like PCIe, Ethernet, or DDR controllers that speed up FPGA design.",
          "Hardware boards that help engineers prototype and test FPGA-based designs.",
          "FPGA-based accelerator cards for AI, analytics, and networking workloads in data centers.",
        ]}
        link="/PDevices"
      />

    </>
  );
}

export default HomePage;
