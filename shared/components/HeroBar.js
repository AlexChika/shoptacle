/* -------------------- original 1 ------------------- */
// import React from "react";
// import styled from "styled-components";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { Store } from "@store/Context";
// import { BiChevronRight } from "react-icons/bi";
// import { MdHome } from "react-icons/md";
// import { TiArrowBack } from "react-icons/ti";

// const categories = [
//   "male-fashion",
//   "female-fashion",
//   "unisex-shoes",
//   "smart-gadgets",
// ];

// const HeroBar = () => {
//   const router = useRouter();
//   const { currRoute, preRoute } = Store();

//   function parsePath(currRoute, prevRoute = "") {
//     if (currRoute === "/")
//       return [{ path: "/", name: "Home", isCurrent: true }];

//     if (currRoute === "/shop/[productDetail]") {
//       currRoute = router.asPath;
//     }

//     let paths = [
//       {
//         path: "/",
//         name: "Home",
//         isCurrent: false,
//       },
//     ];

//     if (preRoute) {
//       const lastVisit = prevRoute
//         .split("/")
//         .filter((p) => p !== "")
//         .at(-1);

//       const isProduct = currRoute.startsWith("/shop/") && currRoute.length > 6;

//       if (categories.includes(lastVisit) && isProduct) {
//         currRoute =
//           "/shop/" + "/" + lastVisit + "/" + currRoute.split("shop/").at(-1);
//       }
//     }

//     const _paths = currRoute.split("/").filter((p) => p !== "");

//     let url = "";
//     for (let i = 0; i < _paths.length; i++) {
//       url += "/" + _paths[i];
//       paths.push({
//         name: parseString(_paths[i].split("_").at(0)),
//         path: url,
//         isCurrent: i === _paths.length - 1,
//       });
//     }

//     return paths;
//   }

//   function parseString(rawUrl) {
//     let decoded = decodeURIComponent(rawUrl);

//     decoded = decoded.replace(/-/g, " ");

//     decoded = decoded.trim().replace(/\s+$/, "");
//     return decoded;
//   }

//   const breadcrumbPath = parsePath(currRoute, preRoute);
//   const previousPage = parsePath(preRoute).at(-1);

//   return (
//     <Wrapper className="mt30 center">
//       <div className="hero-content">
//         <div className="breadcrumb-navigation">
//           <Link href="/" passHref>
//             <a className="home-icon f fcenter">
//               <MdHome />
//             </a>
//           </Link>

//           {breadcrumbPath.map((item, index) => (
//             <React.Fragment key={index}>
//               {index > 0 && (
//                 <small className="separator f fcenter">
//                   <BiChevronRight />
//                 </small>
//               )}
//               {item.isCurrent ? (
//                 <span className="current-page capitalize">{item.name}</span>
//               ) : (
//                 <Link href={item.path}>
//                   <span className="breadcrumb-link capitalize">
//                     {item.name}
//                   </span>
//                 </Link>
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         <Link href={previousPage.path} passHref>
//           <a className="previous-page f">
//             <span className="prev-label f fcenter">
//               <TiArrowBack /> Prev Page <BiChevronRight />{" "}
//             </span>
//             <span className="breadcrumb-link capitalize">
//               {previousPage.name}
//             </span>
//           </a>
//         </Link>
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   background: var(--blue);
//   /* width: 100%; */
//   color: white;
//   max-width: 1170px;
//   max-width: max-content;

//   .hero-content {
//     width: 100%;
//     padding: 5px 15px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-wrap: wrap;
//   }

//   .breadcrumb-navigation {
//     display: flex;
//     align-items: center;
//     font-size: 16px;
//     text-transform: lowercase;
//     width: 100%;
//   }

//   .previous-page {
//     font-size: 14px;
//     margin-top: 8px;
//     width: 100%;
//     /* justify-content: flex-end; */
//   }

//   .breadcrumb-link {
//     color: #f58b42;
//     cursor: pointer;
//     transition: opacity 0.2s ease;
//   }

//   .breadcrumb-link:hover {
//     opacity: 0.8;
//   }

//   .current-page {
//     flex: 1;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   .separator {
//     margin: 0 2px;
//     opacity: 0.8;
//   }

//   .prev-label {
//     opacity: 0.8;
//     margin-right: 4px;
//   }

//   .home-icon {
//     cursor: pointer;
//   }

//   span {
//     width: max-content;
//     max-width: max-content;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     padding: 0px 6px;
//   }

//   @media screen and (min-width: 500px) {
//     .breadcrumb-navigation {
//       font-size: 16px;
//     }

//     .previous-page {
//       max-width: 100%;
//       font-size: 16px;
//       margin-top: 5px;
//     }
//   }

//   @media screen and (min-width: 768px) {
//     .breadcrumb-navigation {
//       font-size: 18px;
//     }
//   }

//   @media screen and (min-width: 1170px) {
//     .hero-content {
//       padding: 7px 15px;
//       /* padding: 7px 0px; */
//     }
//   }
// `;
// export default HeroBar;

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "@store/Context";
import { BiChevronRight } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";

const categories = [
  "male-fashion",
  "female-fashion",
  "unisex-shoes",
  "smart-gadgets",
];

const HeroBar = () => {
  const router = useRouter();
  const { currRoute, preRoute } = Store();

  function parsePath(currRoute, prevRoute = "") {
    if (currRoute === "/")
      return [{ path: "/", name: "Home", isCurrent: true }];

    if (currRoute === "/shop/[productDetail]") {
      currRoute = router.asPath;
    }

    let paths = [
      {
        path: "/",
        name: "Home",
        isCurrent: false,
      },
    ];

    if (preRoute) {
      const lastVisit = prevRoute
        .split("/")
        .filter((p) => p !== "")
        .at(-1);

      const isProduct = currRoute.startsWith("/shop/") && currRoute.length > 6;

      if (categories.includes(lastVisit) && isProduct) {
        currRoute =
          "/shop/" + "/" + lastVisit + "/" + currRoute.split("shop/").at(-1);
      }
    }

    const _paths = currRoute.split("/").filter((p) => p !== "");

    let url = "";
    for (let i = 0; i < _paths.length; i++) {
      url += "/" + _paths[i];
      paths.push({
        name: parseString(_paths[i].split("_").at(0)),
        path: url,
        isCurrent: i === _paths.length - 1,
      });
    }

    return paths;
  }

  function parseString(rawUrl) {
    let decoded = decodeURIComponent(rawUrl);

    decoded = decoded.replace(/-/g, " ");

    decoded = decoded.trim().replace(/\s+$/, "");
    return decoded;
  }

  const breadcrumbPath = parsePath(currRoute, preRoute);
  const previousPage = parsePath(preRoute).at(-1);

  return (
    <Wrapper>
      <div className="hero-content">
        <div className="breadcrumb-navigation">
          <Link href="/" passHref>
            <a className="home-icon">
              <MdHome />
            </a>
          </Link>

          {breadcrumbPath.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="separator">
                  <BiChevronRight />
                </span>
              )}
              {item.isCurrent ? (
                <span className="current-page">{item.name}</span>
              ) : (
                <Link href={item.path}>
                  <span className="breadcrumb-link">{item.name}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        <Link href={previousPage.path} passHref>
          <a className="previous-page">
            <span className="prev-label">
              <TiArrowBack />
              <span>Prev Page</span>
              <BiChevronRight />
            </span>
            <span className="breadcrumb-link previous-page-name">
              {previousPage.name}
            </span>
          </a>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding: 0 15px;
  background-color: white;

  .hero-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    flex-wrap: wrap;
  }

  .breadcrumb-navigation {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .home-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 19px;
    border-radius: 50%;
    padding: 5px;
    transition: all 0.2s ease;

    &:hover {
      color: #333;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  .separator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 1rem;
    margin: 0 2px;
  }

  .breadcrumb-link {
    color: #666;
    font-size: 14px;
    text-transform: capitalize;
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover {
      color: #3a86ff;
      text-decoration: underline;
    }
  }

  .current-page {
    color: #3a86ff;
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .previous-page {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0px;
    border-radius: 4px;
    font-size: 13px;
    color: #666;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f9f9f9;
      color: #333;

      .breadcrumb-link {
        color: #3a86ff;
      }
    }
  }

  .prev-label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: inherit;

    svg {
      font-size: 16px;
    }
  }

  .previous-page-name {
    font-weight: 500;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    .hero-content {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 480px) {
    .breadcrumb-navigation {
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media screen and (min-width: 768px) {
    .hero-content {
      padding: 20px 0px;
    }
  }
`;

export default HeroBar;
